import os

from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    root_path="/api",
)

print("INFO:\t API URL:", os.environ.get("VITE_API_URL"))
if not "https" in (os.environ.get("VITE_API_URL")):
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
