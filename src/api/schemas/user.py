# schemas/user.py
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, EmailStr
from api.schemas.listing import ListingResponse

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str
    profile_image_path: Optional[str] = None
    role: str
    subscription_id: Optional[int] = None

class UserNestedResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str
    profile_image_path: Optional[str]
    role: str

    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str
    profile_image_path: Optional[str]
    role: str
    created_at: datetime
    subscription_id: Optional[int]
    listings: List[ListingResponse] = []

    model_config = ConfigDict(from_attributes=True)
