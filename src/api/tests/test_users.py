import pytest

def test_create_user(client):
    payload = {
        "first_name": "Alice",
        "last_name":  "Smith",
        "email":      "alice@example.com",
        "firebase_uid":"uid_12345"
    }
    res = client.post("/users/", json=payload)
    assert res.status_code == 201
    data = res.json()
    assert data["email"] == payload["email"]
    assert data["firebase_uid"] == payload["firebase_uid"]
    assert "id" in data
    assert "created_at" in data

def test_create_duplicate_user(client):
    payload = {
        "first_name": "Bob",
        "last_name":  "Jones",
        "email":      "bob@example.com",
        "firebase_uid":"uid_67890"
    }
    # first is OK
    r1 = client.post("/users/", json=payload)
    assert r1.status_code == 201

    # second should fail
    r2 = client.post("/users/", json=payload)
    assert r2.status_code == 400
    assert r2.json()["detail"] == "Email already registered"

