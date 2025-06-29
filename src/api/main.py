from fastapi import FastAPI

from api.routers import health, products, users, listings, logs
from api.cors import configure_cors, ROOT_PATH
from api.db import engine
from api.models import Base
import api.schemas
import os
import logging
from logging.handlers import TimedRotatingFileHandler

Base.metadata.create_all(bind=engine)
# from api.faker import populate

log_dir = "../logs"
os.makedirs(log_dir, exist_ok=True)
log_file = os.path.join(log_dir, "vd-api.log")

handler = TimedRotatingFileHandler(
    log_file, when="midnight", interval=1, backupCount=7, encoding="utf-8"
)
handler.suffix = "%Y-%m-%d"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[handler, logging.StreamHandler()],
)

logger = logging.getLogger(__name__)


def create_app():
    app = FastAPI(
        root_path=ROOT_PATH,
    )
    configure_cors(app)

    app.include_router(health.router, prefix="/health")
    app.include_router(users.router, prefix="/users")
    app.include_router(listings.router, prefix="/listings")
    app.include_router(products.router, prefix="/products")
    app.include_router(logs.router, prefix="/logs")

    return app


app = create_app()


@app.get("/")
async def root():
    return {"message": "Hello World"}
