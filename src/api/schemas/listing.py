from typing import Optional
from pydantic import BaseModel, ConfigDict

class ListingResponse(BaseModel):
    id: int
    contact_method: str
    is_public: bool
    asking_price: float
    status: str
    views: int

    # Flattened business fields
    name: str
    market: str
    revenue_per_yr: float
    gross_per_yr: float
    profit_per_yr: float

    # Flattened address fields
    address: str
    longitude: float
    latitude: float

    user_id: int

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
