from fastapi import APIRouter, Depends, HTTPException, status, Request, Query
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import and_
from api.db import get_db
from api.models import Address, Listing, User, Business
from api.schemas.listing import ListingCreate, ListingResponse

router = APIRouter(
    tags=["listings"],
)


@router.post("", response_model=ListingResponse, status_code=status.HTTP_201_CREATED)
async def create_listing(request: Request, db: Session = Depends(get_db)):
    try:
        data = await request.json()
        listing_in = ListingCreate(**data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    business = Business(
        name=listing_in.name,
        market=listing_in.market,
        revenue_per_year=listing_in.revenue_per_yr,
        gross_per_year=listing_in.gross_per_yr,
        profit_per_year=listing_in.profit_per_yr,
    )

    address = Address(
        address_line=listing_in.address,
        longitude=listing_in.longitude,
        latitude=listing_in.latitude,
        city="",
        state="",
        country="",
        postal_code="",
    )

    db.add(address)
    db.flush()
    business.address_id = address.id
    db.add(business)
    db.flush()

    listing = Listing(
        user_id=listing_in.user_id,
        business_id=business.id,
        contact_method=listing_in.contact_method,
        asking_price=listing_in.asking_price,
        is_public=True,
        status="available",
        views=0,
    )

    db.add(listing)
    db.commit()
    db.refresh(listing)

    return {
        "id": listing.id,
        "contact_method": listing.contact_method,
        "is_public": listing.is_public,
        "asking_price": listing.asking_price,
        "status": listing.status,
        "views": listing.views,
        "name": business.name,
        "market": business.market,
        "revenue_per_yr": business.revenue_per_year,
        "gross_per_yr": business.gross_per_year,
        "profit_per_yr": business.profit_per_year,
        "address": address.address_line,
        "longitude": address.longitude,
        "latitude": address.latitude,
        "user_id": listing.user_id,
    }


@router.get(
    "/id/{listing_id:int}",
    response_model=ListingResponse,
    status_code=status.HTTP_200_OK,
)
def get_listing_by_id(listing_id: int, db: Session = Depends(get_db)):
    listing = (
        db.query(Listing)
        .filter(Listing.id == listing_id)
        .options(selectinload(Listing.business).selectinload(Business.address))
        .first()
    )
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    addr = listing.business.address
    return {
        "id": listing.id,
        "contact_method": listing.contact_method,
        "is_public": listing.is_public,
        "asking_price": listing.asking_price,
        "status": listing.status,
        "views": listing.views,
        "name": listing.business.name,
        "market": listing.business.market,
        "revenue_per_yr": listing.business.revenue_per_year,
        "gross_per_yr": listing.business.gross_per_year,
        "profit_per_yr": listing.business.profit_per_year,
        "address": addr.address_line,
        "longitude": addr.longitude,
        "latitude": addr.latitude,
        "user_id": listing.user_id,
    }


@router.get("/geo", response_model=list[ListingResponse])
def get_listings_by_bounds(
    ne_lat: float = Query(...),
    ne_lng: float = Query(...),
    sw_lat: float = Query(...),
    sw_lng: float = Query(...),
    buffer_deg: float = Query(0.02),
    db: Session = Depends(get_db),
):
    min_lat = sw_lat - buffer_deg
    max_lat = ne_lat + buffer_deg
    min_lng = sw_lng - buffer_deg
    max_lng = ne_lng + buffer_deg

    listings = (
        db.query(Listing)
        .join(Business, Business.id == Listing.business_id)
        .join(Address, Address.id == Business.address_id)
        .filter(
            Address.latitude.between(min_lat, max_lat),
            Address.longitude.between(min_lng, max_lng),
        )
        .options(selectinload(Listing.business).selectinload(Business.address))
        .all()
    )

    return [
        {
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
            "address": l.business.address.address_line,
            "longitude": l.business.address.longitude,
            "latitude": l.business.address.latitude,
            "user_id": l.user_id,
        }
        for l in listings
    ]


@router.get("", response_model=list[ListingResponse])
def get_listings(
    offset: int = Query(0, ge=0),
    limit: int = Query(50, ge=1),
    db: Session = Depends(get_db)
):    
    listings = (
        db.query(Listing)
        .options(selectinload(Listing.business).selectinload(Business.address))
        .order_by(Listing.id.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    result = []
    for l in listings:
        addr = l.business.address
        result.append(
            {
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
            }
        )
    return result


@router.get(
    "/user/{firebase_uid}",
    response_model=list[ListingResponse],
    status_code=status.HTTP_200_OK,
)
def get_listings_by_firebase_uid(firebase_uid: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.firebase_uid == firebase_uid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    listings = (
        db.query(Listing)
        .filter(Listing.user_id == user.id)
        .options(selectinload(Listing.business).selectinload(Business.address))
        .all()
    )

    result = []
    for l in listings:
        addr = l.business.address
        result.append(
            {
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
            }
        )
    return result
