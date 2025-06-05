from pydantic import BaseModel


class HealthCheckResponse(BaseModel):
    db_alive: bool
    result: int
