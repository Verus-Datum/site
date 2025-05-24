from sqlalchemy import Column, DateTime, Integer, String, func, Float, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from src.api.db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)

    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=True)
    firebase_uid = Column(String, nullable=False, index=True)

    listings = relationship("Listing", back_populates="user", cascade="all, delete-orphan")

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        index=True,
    )

class Listing(Base):
    __tablename__ = "listings"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    market = Column(String, nullable=False)
    contact_method = Column(String, nullable=False)
    is_public = Column(Boolean, default=True, nullable=False)

    longitude = Column(Float, nullable=False)
    latitude = Column(Float, nullable=False)

    asking_price = Column(Float, nullable=False)
    revenue_per_yr = Column(Float, nullable=False)
    gross_per_yr = Column(Float, nullable=False)
    profit_per_yr = Column(Float, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    user = relationship("User", back_populates="listings")