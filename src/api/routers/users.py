from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.api.db import get_db
from src.api.models import User
from src.api.schemas import UserCreate, UserResponse

router = APIRouter(
    tags=["users"],
)

@router.post(
    "",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user_in.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=user_in.email,
        firebase_uid=user_in.firebase_uid,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.get(
    "/{firebase_uid}",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
)
def read_user(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
