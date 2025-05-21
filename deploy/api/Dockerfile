FROM python:3.11-slim

WORKDIR /app

# TODO: use version locked file
COPY deploy/api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY src/api/main.py ./main.py

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081", "--workers", "8"]
