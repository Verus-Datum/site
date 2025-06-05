from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.db import get_db
from api.models import User
from api.schemas.user import UserCreate, UserResponse

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
            status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered"
        )

    user = User(
        first_name=user_in.first_name,
        last_name=user_in.last_name,
        email=user_in.email,
        firebase_uid=user_in.firebase_uid,
        profile_image_path=user_in.profile_image_path,
        role=user_in.role,
        subscription_id=user_in.subscription_id,
        created_at=datetime.utcnow(),
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
