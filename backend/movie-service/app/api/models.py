from pydantic import BaseModel
from typing import List, Optional

class MovieIn(BaseModel):
    name: str
    plot: str
    genres: str
    image: str
    imageBd: str


class MovieOut(MovieIn):
    id: int


class MovieUpdate(MovieIn):
    name: Optional[str] = None
    plot: Optional[str] = None
    genres: Optional[List[str]] = None
    image: Optional[List[str]] = None
    imageBd: Optional[List[str]] = None