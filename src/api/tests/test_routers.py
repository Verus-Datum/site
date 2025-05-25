# import pytest

def create_user(client, first_name="Test", last_name="User", email=None, firebase_uid=None):
    if email is None:
        email = f"{first_name.lower()}.{last_name.lower()}@example.com"
    if firebase_uid is None:
        firebase_uid = f"uid-{first_name.lower()}"
    payload = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "firebase_uid": firebase_uid,
    }
    response = client.post("/users", json=payload)
    assert response.status_code == 201
    return response.json()

""" Health router tests """
def test_health_check(client):
    response = client.get("/health/db")
    assert response.status_code == 200
    data = response.json()
    assert data["db_alive"] is True
    assert data["result"] == 1

""" Users router tests """
def test_create_user_success(client):
    user = create_user(client, first_name="Jane", last_name="Doe",
                       email="jane.doe@example.com", firebase_uid="uid-123")
    assert user["first_name"] == "Jane"
    assert user["last_name"] == "Doe"
    assert user["email"] == "jane.doe@example.com"
    assert user["firebase_uid"] == "uid-123"
    assert "id" in user


def test_create_user_duplicate(client):
    # first creation should succeed
    create_user(client, first_name="John", last_name="Smith",
                email="john.smith@example.com", firebase_uid="uid-456")
    # duplicate email should fail
    payload = {
        "first_name": "John",
        "last_name": "Smith",
        "email": "john.smith@example.com",
        "firebase_uid": "uid-456"
    }
    response = client.post("/users", json=payload)
    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"


def test_read_user_success(client):
    created = create_user(client, first_name="Alice", last_name="Wonderland",
                          email="alice@example.com", firebase_uid="uid-789")
    response = client.get(f"/users/{created['firebase_uid']}")
    assert response.status_code == 200
    data = response.json()
    assert data["firebase_uid"] == "uid-789"
    assert data["email"] == "alice@example.com"


def test_read_user_not_found(client):
    response = client.get("/users/nonexistent-uid")
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"

""" Listings router tests """
def test_get_all_listings_empty(client):
    response = client.get("/listings")
    assert response.status_code == 200
    assert response.json() == []


def test_create_listing_success(client):
    user = create_user(client, first_name="Listing", last_name="Creator",
                       email="listing.creator@example.com", firebase_uid="uid-listing")
    listing_payload = {
        "name": "Test Listing",
        "address": "123 Test St",
        "market": "Test Market",
        "contact_method": "email",
        "longitude": 10.0,
        "latitude": 20.0,
        "asking_price": 100.0,
        "revenue_per_yr": 200.0,
        "gross_per_yr": 300.0,
        "profit_per_yr": 400.0,
        "user_id": user["id"]
    }
    response = client.post("/listings", json=listing_payload)
    assert response.status_code == 201
    data = response.json()
    for key, value in listing_payload.items():
        assert data[key] == value
    assert "id" in data


def test_get_all_listings(client):
    user = create_user(client, first_name="Lister", last_name="Tester",
                       email="lister.tester@example.com", firebase_uid="uid-list-all")
    listing_payload = {
        "name": "Another Listing",
        "address": "456 Another St",
        "market": "Another Market",
        "contact_method": "phone",
        "longitude": 30.0,
        "latitude": 40.0,
        "asking_price": 150.0,
        "revenue_per_yr": 250.0,
        "gross_per_yr": 350.0,
        "profit_per_yr": 450.0,
        "user_id": user["id"]
    }
    client.post("/listings", json=listing_payload)

    response = client.get("/listings")
    assert response.status_code == 200
    listings = response.json()
    assert isinstance(listings, list)
    assert len(listings) >= 1


def test_get_listings_by_firebase_uid_success(client):
    user = create_user(client, first_name="FB", last_name="User",
                       email="fb.user@example.com", firebase_uid="uid-fb-list")
    listing_payload = {
        "name": "FB Listing",
        "address": "789 FB St",
        "market": "FB Market",
        "contact_method": "email",
        "longitude": 50.0,
        "latitude": 60.0,
        "asking_price": 200.0,
        "revenue_per_yr": 300.0,
        "gross_per_yr": 400.0,
        "profit_per_yr": 500.0,
        "user_id": user["id"]
    }
    client.post("/listings", json=listing_payload)

    response = client.get(f"/listings/{user['firebase_uid']}")
    assert response.status_code == 200
    listings = response.json()
    assert isinstance(listings, list)
    assert len(listings) >= 1
    assert listings[0]["user_id"] == user["id"]


def test_get_listings_by_firebase_uid_not_found(client):
    response = client.get("/listings/nonexistent-uid")
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"

