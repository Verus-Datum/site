from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import text
from sqlalchemy.orm import Session

from src.api.db import get_db
from src.api.schemas import HealthCheckResponse

router = APIRouter(tags=["health"])

@router.get(
    "/db",
    response_model=HealthCheckResponse,
    status_code=status.HTTP_200_OK
)
def health_check(db: Session = Depends(get_db)):
    try:
        result = db.execute(text("SELECT 1")).scalar()
        return {"db_alive": True, "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"DB error: {e}")
