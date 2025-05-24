from fastapi import Depends, FastAPI, HTTPException, APIRouter
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from api.routers import health
from api.cors import API_URL, configure_cors
from api.db import get_db


from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from api.db import get_db
from api.models import User
from api.schemas import UserCreate, UserResponse


# def create_app() -> FastAPI:
app = FastAPI(
    root_path="/" if "https" not in API_URL else "/api",
)
configure_cors(app)

    # app.include_router(health.router, prefix="/health")
    # return app


# app = create_app()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post(
    "/users",
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


@app.get(
    "/{user_id}",
    response_model=UserResponse,
    status_code=status.HTTP_200_OK,
)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
