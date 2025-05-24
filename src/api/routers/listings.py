from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.api.db import get_db
from src.api.models import Listing, User
from src.api.schemas import ListingCreate, ListingResponse

router = APIRouter(
    tags=["listings"],
)

@router.post(
    "",
    response_model=ListingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_listing(listing_in: ListingCreate, db: Session = Depends(get_db)):
    listing = Listing(
        name=listing_in.name,
        address=listing_in.address,
        market=listing_in.market,
        contact_method=listing_in.contact_method,
        longitude=listing_in.longitude,
        latitude=listing_in.latitude,
        asking_price=listing_in.asking_price,
        revenue_per_yr=listing_in.revenue_per_yr,
        gross_per_yr=listing_in.gross_per_yr,
        profit_per_yr=listing_in.profit_per_yr,
        user_id=listing_in.user_id
    )

    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing

@router.get(
    "",
    response_model=list[ListingResponse],
    status_code=status.HTTP_200_OK,
)
def get_all_listings(db: Session = Depends(get_db)):
    return db.query(Listing).all()

@router.get(
    "/{firebase_uid}",
    response_model=list[ListingResponse],
    status_code=status.HTTP_200_OK,
)
def get_listings_by_firebase_uid(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return db.query(Listing).filter(Listing.user_id == user.id).all()