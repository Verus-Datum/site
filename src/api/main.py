from fastapi import Depends, FastAPI, HTTPException, APIRouter, status
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from src.api.routers import health, users, listings
from src.api.cors import API_URL, configure_cors
from src.api.db import get_db, engine

from sqlalchemy.orm import Session

from src.api.db import get_db
from src.api.models import User, Listing, Base
Base.metadata.create_all(bind=engine)

from src.api.schemas import UserCreate, UserResponse

app = FastAPI(
    root_path="/" if "https" not in API_URL else "/api",
)
configure_cors(app)

app.include_router(users.router, prefix="/users")   
app.include_router(listings.router, prefix="/listings")   

@app.get("/")
async def root():
    return {"message": "Hello World"}