import jwt

from fastapi import APIRouter, FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from tortoise import fields 
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model 
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url="/api/v1/users/openapi.json", docs_url="/api/v1/users/docs")

origins = [
"*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


JWT_SECRET = 'myjwtsecret'

class Users(Model):
    id = fields.IntField(pk=True)
    first_name = fields.CharField(50)
    last_name = fields.CharField(50)
    username = fields.CharField(50, unique=True)
    password_hash = fields.CharField(128)
    is_superuser = fields.BooleanField(default=False)

    def verify_password(self, password):
        return bcrypt.verify(password, self.password_hash)

User_Pydantic = pydantic_model_creator(Users, name='User')
UserIn_Pydantic = pydantic_model_creator(Users, name='UserIn', exclude_readonly=True)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

async def authenticate_user(username: str, password: str):
    user = await Users.get(username=username)
    if not user:
        return False 
    if not user.verify_password(password):
        return False
    return user 

@app.post('/api/v1/users/login')
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )

    user_obj = await User_Pydantic.from_tortoise_orm(user)

    token = jwt.encode(user_obj.dict(), JWT_SECRET)

    return {'access_token' : token, 'token_type' : 'bearer'}

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = await Users.get(id=payload.get('id'))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail='Invalid username or password'
        )

    return await User_Pydantic.from_tortoise_orm(user)


@app.post('/api/v1/users', response_model=User_Pydantic)
async def create_user(user: UserIn_Pydantic):
    user_obj = Users(username=user.username, password_hash=bcrypt.hash(user.password_hash), first_name=user.first_name, last_name=user.last_name, is_superuser=False)
    await user_obj.save()
    return await User_Pydantic.from_tortoise_orm(user_obj)

@app.get('/api/v1/users/me', response_model=User_Pydantic)
async def get_user(user: User_Pydantic = Depends(get_current_user)):
    return user    

register_tortoise(
    app, 
    db_url=os.getenv('DATABASE_URI'),
    modules={'models': ['app.main']},
    generate_schemas=True,
    add_exception_handlers=True
)

