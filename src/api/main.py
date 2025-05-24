from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from api.cors import API_URL, configure_cors
from api.db import get_db
from api.routers import health, users


def create_app() -> FastAPI:
    app = FastAPI(
        root_path="/" if "https" not in API_URL else "/api",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],      # or ["*"] during development
        allow_credentials=True,
        allow_methods=["*"],          # <-- enables OPTIONS, GET, POST, etc.
        allow_headers=["*"],          # <-- lets your client send content-type, authorization, etc.
    ) # im going to kill myself

    # no need to call configure_cors any more (un   less it does something else)
    app.include_router(health.router, prefix="/health")
    app.include_router(users.router, prefix="/users")
    return app

app = create_app()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/health/db")
def health_check(db=Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"db_alive": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")
