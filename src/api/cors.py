import os
import warnings
from fastapi.middleware.cors import CORSMiddleware


API_URL = os.environ.get("VITE_API_URL", None)
if API_URL is None:
    warnings.warn("API_URL is set to None")


def configure_cors(app):
    if "https" not in API_URL:
        print("\nConfiguring CORS\n")
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

