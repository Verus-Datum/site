from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
    func,
    Float,
    ForeignKey,
    Boolean,
)
from sqlalchemy.orm import relationship

from api.db import Base


class Subscription(Base):
    __tablename__ = "subscriptions"
    id = Column(Integer, primary_key=True)
    stripe_customer_id = Column(String, unique=True)
    stripe_subscription_id = Column(String)
    plan_id = Column(String)
    subscription_status = Column(String)
    current_period_end = Column(String)

    users = relationship("User", back_populates="subscription")


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    profile_image_path = Column(String, nullable=True)
    role = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True)
    firebase_uid = Column(String)
    created_at = Column(DateTime)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id"))

    subscription = relationship("Subscription", back_populates="users")
    listings = relationship("Listing", back_populates="user")
    broker_profile = relationship("Broker", uselist=False, back_populates="user")
    seller_transactions = relationship(
        "Transaction",
        foreign_keys="[Transaction.seller_user_id]",
        back_populates="seller",
    )
    buyer_transactions = relationship(
        "Transaction",
        foreign_keys="[Transaction.buyer_user_id]",
        back_populates="buyer",
    )
    favorites = relationship("Favorite", back_populates="user")


class Broker(Base):
    __tablename__ = "brokers"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    first_name = Column(String)
    last_name = Column(String)
    phone_number = Column(String)
    company_name = Column(String)
    company_address = Column(String)

    user = relationship("User", back_populates="broker_profile")


class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True)
    address_line = Column(String)
    city = Column(String)
    state = Column(String)
    country = Column(String)
    postal_code = Column(String)
    longitude = Column(Float)
    latitude = Column(Float)

    businesses = relationship("Business", back_populates="address")


class Business(Base):
    __tablename__ = "businesses"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    market = Column(String)
    address_id = Column(Integer, ForeignKey("addresses.id"), nullable=True)
    revenue_per_year = Column(Float)
    gross_per_year = Column(Float)
    profit_per_year = Column(Float)
    number_of_employees = Column(Integer)
    years_in_business = Column(Integer)
    ownership_type = Column(String)
    type_of_sale = Column(String)
    reason_for_sale = Column(String)
    will_stay_post_sale = Column(Boolean)
    confidential_sale = Column(Boolean)
    website = Column(String, nullable=True)

    address = relationship("Address", back_populates="businesses")
    listings = relationship("Listing", back_populates="business")
    documents = relationship("Document", back_populates="business")


class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    business_id = Column(Integer, ForeignKey("businesses.id"))
    contact_method = Column(String)
    is_public = Column(Boolean)
    asking_price = Column(Float)
    status = Column(String)
    views = Column(Integer)
    listed_at = Column(DateTime)

    user = relationship("User", back_populates="listings")
    business = relationship("Business", back_populates="listings")
    transactions = relationship("Transaction", back_populates="listing")
    favorites = relationship("Favorite", back_populates="listing")
    images = relationship("ListingImage", back_populates="listing")


class Transaction(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    seller_user_id = Column(Integer, ForeignKey("users.id"))
    buyer_user_id = Column(Integer, ForeignKey("users.id"))
    price = Column(Float)
    sold_at = Column(DateTime)

    listing = relationship("Listing", back_populates="transactions")
    seller = relationship(
        "User", foreign_keys=[seller_user_id], back_populates="seller_transactions"
    )
    buyer = relationship(
        "User", foreign_keys=[buyer_user_id], back_populates="buyer_transactions"
    )


class Favorite(Base):
    __tablename__ = "favorites"
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    listing_id = Column(Integer, ForeignKey("listings.id"))

    user = relationship("User", back_populates="favorites")
    listing = relationship("Listing", back_populates="favorites")


class ListingImage(Base):
    __tablename__ = "listing_images"
    id = Column(Integer, primary_key=True)
    listing_id = Column(Integer, ForeignKey("listings.id"))
    image_path = Column(String)

    listing = relationship("Listing", back_populates="images")


class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True)
    business_id = Column(Integer, ForeignKey("businesses.id"))
    document_name = Column(String)
    document_type = Column(String)
    file_path = Column(String)
    uploaded_at = Column(DateTime)

    business = relationship("Business", back_populates="documents")
