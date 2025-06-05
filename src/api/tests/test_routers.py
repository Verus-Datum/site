# import pytest


def create_user(client, email="user@example.com", firebase_uid="uid-user"):
    payload = {
        "first_name": "Test",
        "last_name": "User",
        "email": email,
        "firebase_uid": firebase_uid,
        "role": "buyer",
        "profile_image_path": None,
        "subscription_id": None,
    }
    res = client.post("/users", json=payload)
    assert res.status_code == 201
    return res.json()


def test_health_check(client):
    res = client.get("/health/db")
    assert res.status_code == 200
    data = res.json()
    assert data["db_alive"] is True
    assert data["result"] == 1


def test_create_user_success(client):
    user = create_user(client, email="jane.doe@example.com", firebase_uid="uid-jane")
    assert user["first_name"] == "Test"
    assert user["email"] == "jane.doe@example.com"


def test_create_user_duplicate(client):
    create_user(client, email="dup@example.com", firebase_uid="uid-dup")
    payload = {
        "first_name": "Dup",
        "last_name": "User",
        "email": "dup@example.com",
        "firebase_uid": "uid-dup",
        "role": "buyer",
        "profile_image_path": None,
        "subscription_id": None,
    }
    res = client.post("/users", json=payload)
    assert res.status_code == 400
    assert res.json()["detail"] == "Email already registered"


def test_read_user_success(client):
    user = create_user(client, email="alice@example.com", firebase_uid="uid-alice")
    res = client.get(f"/users/{user['firebase_uid']}")
    assert res.status_code == 200
    assert res.json()["email"] == "alice@example.com"


def test_read_user_not_found(client):
    res = client.get("/users/nonexistent-uid")
    assert res.status_code == 404
    assert res.json()["detail"] == "User not found"


def test_get_all_listings_empty(client):
    res = client.get("/listings")
    assert res.status_code == 200
    assert res.json() == []


def test_create_listing_success(client):
    user = create_user(client, email="listing@example.com", firebase_uid="uid-listing")
    payload = {
        "name": "Test Business",
        "address": "123 Test St",
        "market": "Retail",
        "longitude": 10.0,
        "latitude": 20.0,
        "revenue_per_yr": 100000.0,
        "gross_per_yr": 150000.0,
        "profit_per_yr": 20000.0,
        "user_id": user["id"],
        "contact_method": "email",
        "asking_price": 500000.0,
    }
    res = client.post("/listings", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert data["user_id"] == user["id"]
    assert data["asking_price"] == 500000.0


def test_get_all_listings(client):
    test_create_listing_success(client)
    res = client.get("/listings")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert len(data) >= 1


def test_get_listings_by_firebase_uid_success(client):
    user = create_user(client, email="fb@example.com", firebase_uid="uid-fetch")
    payload = {
        "name": "FB Business",
        "address": "456 Another St",
        "market": "Tech",
        "longitude": 30.0,
        "latitude": 40.0,
        "revenue_per_yr": 500000.0,
        "gross_per_yr": 600000.0,
        "profit_per_yr": 70000.0,
        "user_id": user["id"],
        "contact_method": "phone",
        "asking_price": 300000.0,
    }
    client.post("/listings", json=payload)
    res = client.get(f"/listings/user/{user['firebase_uid']}")
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert any(d["user_id"] == user["id"] for d in data)


def test_get_listings_by_firebase_uid_not_found(client):
    res = client.get("/listings/user/nonexistent-uid")
    assert res.status_code == 404
    assert res.json()["detail"] == "User not found"


def test_get_listing_by_id_success(client):
    user = create_user(client, email="id@example.com", firebase_uid="uid-id")
    payload = {
        "name": "ID Business",
        "address": "789 Sample Rd",
        "market": "Services",
        "longitude": 50.0,
        "latitude": 60.0,
        "revenue_per_yr": 800000.0,
        "gross_per_yr": 850000.0,
        "profit_per_yr": 90000.0,
        "user_id": user["id"],
        "contact_method": "email",
        "asking_price": 400000.0,
    }
    res = client.post("/listings", json=payload)
    assert res.status_code == 201
    listing = res.json()

    res = client.get(f"/listings/id/{listing['id']}")
    assert res.status_code == 200
    data = res.json()
    assert data["id"] == listing["id"]
    assert data["name"] == "ID Business"

def test_get_listing_by_id_not_found(client):
    res = client.get("/listings/id/999999")
    assert res.status_code == 404
    assert res.json()["detail"] == "Listing not found"
