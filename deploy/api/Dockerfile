FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# TODO: use version locked file
COPY deploy/api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src/api src/api

ENV PYTHONPATH=/app/src

RUN pip install -e src/api

CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8081", "--workers", "8"]
