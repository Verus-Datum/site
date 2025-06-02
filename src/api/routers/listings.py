from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session, selectinload
from api.db import get_db
from api.models import Listing, User, Business
from api.schemas.listing import ListingCreate, ListingResponse

router = APIRouter(
    tags=["listings"],
)


@router.post(
    "",
    response_model=ListingResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_listing(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
        print("Incoming data:", data)
        listing_in = ListingCreate(**data)
    except Exception as e:
        print("Validation error:", e)
        raise

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
        user_id=listing_in.user_id,
    )

    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing


@router.get("", response_model=list[ListingResponse])
def get_listings(db: Session = Depends(get_db)):
    listings = (
        db.query(Listing)
        .options(
            selectinload(Listing.business).selectinload(Business.address)
        )
        .all()
    )

    result = []
    for l in listings:
        addr = l.business.address
        result.append({
            "id": l.id,
            "contact_method": l.contact_method,
            "is_public": l.is_public,
            "asking_price": l.asking_price,
            "status": l.status,
            "views": l.views,
            "name": l.business.name,
            "market": l.business.market,
            "revenue_per_yr": l.business.revenue_per_year,
            "gross_per_yr": l.business.gross_per_year,
            "profit_per_yr": l.business.profit_per_year,
            "address": addr.address_line,
            "longitude": addr.longitude,
            "latitude": addr.latitude,
            "user_id": l.user_id,
        })
    return result


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
