from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr


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

    model_config = ConfigDict(from_attributes=True)

class HealthCheckResponse(BaseModel):
    db_alive: bool
    result: int
