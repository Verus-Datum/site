import os
import warnings
from fastapi.middleware.cors import CORSMiddleware


API_URL = os.environ.get("API_URL", "localhost:8081")
if API_URL == "localhost:8081":
    warnings.warn("API_URL is set to localhost:8081")
    allowed_origins=["*"]
else:
    allowed_origins=["https://vd.harville.dev"]

print(f"{API_URL=}")


def configure_cors(app):
    print("\nConfiguring CORS\n")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
