from fastapi import FastAPI

from api.routers import health, users, listings
from api.cors import configure_cors, ROOT_PATH
from api.db import engine
from api.models import Base

Base.metadata.create_all(bind=engine)
# from api import faker

def create_app():
    app = FastAPI(
        root_path=ROOT_PATH,
    )
    configure_cors(app)

    app.include_router(health.router, prefix="/health")
    app.include_router(users.router, prefix="/users")
    app.include_router(listings.router, prefix="/listings")

    return app


app = create_app()


@app.get("/")
async def root():
    return {"message": "Hello World"}

