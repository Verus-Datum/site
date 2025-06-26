from faker import Faker
from sqlalchemy.orm import Session
from api.db import SessionLocal
from api.models import Address, User, Business, Listing, Broker
from datetime import datetime
import random

CITIES = {
    "Huntsville": {"state": "AL", "lat": (34.65, 34.80), "lng": (-86.75, -86.55)},
    "Birmingham": {"state": "AL", "lat": (33.45, 33.60), "lng": (-86.90, -86.70)},
    "Nashville": {"state": "TN", "lat": (36.10, 36.25), "lng": (-86.85, -86.65)},
    "Raleigh": {"state": "NC", "lat": (35.75, 35.85), "lng": (-78.70, -78.55)},
    "Memphis": {"state": "TN", "lat": (35.05, 35.20), "lng": (-90.10, -89.90)},
}


def random_city_address():
    city_name, data = random.choice(list(CITIES.items()))
    lat = round(random.uniform(*data["lat"]), 6)
    lng = round(random.uniform(*data["lng"]), 6)
    return {
        "city": city_name,
        "state": data["state"],
        "latitude": lat,
        "longitude": lng,
    }


fake = Faker()
db: Session = SessionLocal()


def create_fake_user(role=None):
    return User(
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        email=fake.unique.email(),
        firebase_uid=fake.uuid4(),
        profile_image_path=None,
        role=role if role else random.choice(["buyer", "broker"]),
        created_at=datetime.utcnow(),
    )


def create_fake_broker(user_id):
    return Broker(
        user_id=user_id,
        first_name=fake.first_name(),
        last_name=fake.last_name(),
        phone_number=fake.phone_number(),
        company_name=fake.company(),
        company_address=fake.address(),
    )


def create_fake_business(address_id):
    return Business(
        name=fake.company(),
        address_id=address_id,
        market=random.choice(["Technology", "Retail", "Healthcare"]),
        revenue_per_year=fake.pyfloat(min_value=1e5, max_value=5e6),
        gross_per_year=fake.pyfloat(min_value=1e5, max_value=5e6),
        profit_per_year=fake.pyfloat(min_value=1e4, max_value=1e6),
        number_of_employees=fake.random_int(min=1, max=100),
        years_in_business=fake.random_int(min=1, max=20),
        ownership_type="LLC",
        type_of_sale="Full Sale",
        reason_for_sale="Retirement",
        will_stay_post_sale=True,
        confidential_sale=False,
        website=fake.url(),
    )


def create_fake_address():
    loc = random_city_address()
    return Address(
        address_line=fake.street_address(),
        city=loc["city"],
        state=loc["state"],
        country="USA",
        postal_code=fake.postcode(),
        longitude=loc["longitude"],
        latitude=loc["latitude"],
    )


def create_fake_listing(user_id, business_id):
    return Listing(
        user_id=user_id,
        business_id=business_id,
        contact_method=random.choice(["Broker", "Direct Owner"]),
        is_public=True,
        asking_price=fake.pyfloat(min_value=1e4, max_value=5e6),
        status="available",
        views=fake.random_int(min=0, max=500),
        listed_at=datetime.utcnow(),
    )


def populate():
    # Generate 80–90 brokers
    NUM_BROKERS = 85
    broker_users = []

    for _ in range(NUM_BROKERS):
        user = create_fake_user(role="broker")
        db.add(user)
        db.flush()
        broker = create_fake_broker(user.id)
        db.add(broker)
        broker_users.append(user)

    db.flush()

    # Generate 150 businesses and assign to brokers in round-robin
    for i in range(150):
        broker_user = broker_users[i % NUM_BROKERS]
        address = create_fake_address()
        db.add(address)
        db.flush()
        business = create_fake_business(address.id)
        db.add(business)
        db.flush()
        listing = create_fake_listing(broker_user.id, business.id)
        db.add(listing)

    db.commit()
    db.close()
