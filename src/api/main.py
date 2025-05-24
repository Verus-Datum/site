from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text

from cors import configure_cors
from db import get_db

from routers import health, users


def create_app() -> FastAPI:
    app = FastAPI(
        root_path="/api",
    )
    configure_cors(app)
    app.include_router(health.router, prefix="/health") # /health/{db, serv2, etc.}
    app.include_router(users.router) # /users
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

