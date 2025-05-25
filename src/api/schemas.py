from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, EmailStr

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str

    
class UserNestedResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str

    model_config = ConfigDict(from_attributes=True)

class ListingResponse(BaseModel):
    id: int
    name: str
    address: str
    market: str
    contact_method: str
    longitude: float
    latitude: float
    asking_price: float
    revenue_per_yr: float
    gross_per_yr: float
    profit_per_yr: float
    user_id: int
    user: Optional[UserNestedResponse] = None

    model_config = ConfigDict(from_attributes=True)

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    firebase_uid: str
    created_at: datetime
    listings: List[ListingResponse] = []

    model_config = ConfigDict(from_attributes=True)

class ListingCreate(BaseModel):
    name: str
    address: str
    market: str
    contact_method: str
    longitude: float
    latitude: float
    asking_price: float
    revenue_per_yr: float
    gross_per_yr: float
    profit_per_yr: float
    user_id: int

class HealthCheckResponse(BaseModel):
    db_alive: bool
    result: int
