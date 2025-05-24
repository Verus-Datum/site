from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str
    created_at: datetime

    class Config:
        orm_mode = True

class HealthCheckResponse(BaseModel):
    db_alive: bool
    result: int
