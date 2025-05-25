import os
import warnings
from fastapi.middleware.cors import CORSMiddleware


API_URL = os.environ.get("API_URL", "localhost:8081")
if API_URL == "localhost:8081":
    warnings.warn("API_URL is set to localhost:8081")


def configure_cors(app):
    # if "https" not in API_URL:
    if True:
        print("\nConfiguring CORS for dev\n")
        app.add_middleware(
            CORSMiddleware,
            # allow_origins=["*"],
            allow_origins=["http://localhost:3000"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
