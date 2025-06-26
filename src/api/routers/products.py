from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from api.db import get_db
from api.models import Product
from api.schemas.product import ProductResponse, ProductCreate

router = APIRouter(
    tags=["products"],
)


@router.get("", response_model=list[ProductResponse], status_code=status.HTTP_200_OK)
def get_all_products(db: Session = Depends(get_db)):
    return db.query(Product).order_by(Product.id.asc()).all()

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
def create_product(product_in: ProductCreate, db: Session = Depends(get_db)):
    product = Product(**product_in.dict())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product