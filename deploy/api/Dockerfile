FROM python:3.11-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      build-essential \
      libpq-dev \
      python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY deploy/api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src/api src/api

ENV PYTHONPATH=/app/src

RUN pip install -e src/api

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "8"]
