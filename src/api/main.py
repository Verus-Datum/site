import os

from fastapi import FastAPI, status, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

app = FastAPI(
    root_path="/api",
)

API_URL = os.environ.get("VITE_API_URL")
DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

print(f"{API_URL=}")
if "https" not in API_URL:
    # Production sets CORS in nginx, so we wouldnt set it here again.
    print("\nConfiguring CORS\n")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


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
