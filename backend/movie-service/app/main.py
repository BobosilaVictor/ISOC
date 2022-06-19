from fastapi import FastAPI
from app.api.movies import movies
from app.api.db import metadata, database, engine
from fastapi.middleware.cors import CORSMiddleware
metadata.create_all(engine)

app = FastAPI(openapi_url="/api/v1/movies/openapi.json", docs_url="/api/v1/movies/docs")

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


@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


app.include_router(movies, prefix='/api/v1/movies', tags=['movies'])