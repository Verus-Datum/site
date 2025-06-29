from fastapi import APIRouter, HTTPException, status
from fastapi.responses import PlainTextResponse
import os

router = APIRouter(tags=["logs"])

LOG_PATH = "../logs/vd-api.log"


@router.get("", response_class=PlainTextResponse, status_code=status.HTTP_200_OK)
def get_logs():
    if not os.path.exists(LOG_PATH):
        raise HTTPException(status_code=404, detail="Log file not found")
    try:
        with open(LOG_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading log file: {e}")
