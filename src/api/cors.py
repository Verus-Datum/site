import os
import warnings
from fastapi.middleware.cors import CORSMiddleware


API_URL = os.environ.get("API_URL", "localhost:8081")
ROOT_PATH = "/api"

if API_URL == "localhost:8081":
    warnings.warn("API_URL is set to localhost:8081")
print(f"{API_URL=}\n{ROOT_PATH=}")


def configure_cors(app):
    # if "https" not in API_URL:
    if True:
        print("\nConfiguring CORS for dev\n")
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            # allow_origins=["http://localhost", "https://vd.harville.dev", "http://127.0.0.1"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
