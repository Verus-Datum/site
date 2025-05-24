# import pytest

def test_health_db(client):
    res = client.get("/health/db")
    assert res.status_code == 200
    body = res.json()
    assert body["db_alive"] is True
    assert body["result"] == 1

