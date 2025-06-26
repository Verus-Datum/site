from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    tags: Optional[str] = None
    price: float
    locked: bool = True
    popular: bool = False
    preview_available: bool = True


class ProductResponse(ProductBase):
    id: int
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class ProductCreate(ProductBase):
    pass
