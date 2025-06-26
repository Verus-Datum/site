from fastapi import FastAPI

from api.routers import health, products, users, listings
from api.cors import configure_cors, ROOT_PATH
from api.db import engine
from api.models import Base
import api.schemas

Base.metadata.create_all(bind=engine)
# from api.faker import populate

def create_app():
    app = FastAPI(
        root_path=ROOT_PATH,
    )
    configure_cors(app)

    app.include_router(health.router, prefix="/health")
    app.include_router(users.router, prefix="/users")
    app.include_router(listings.router, prefix="/listings")
    app.include_router(products.router, prefix="/products")

    return app


app = create_app()


@app.get("/")
async def root():
    return {"message": "Hello World"}
