# Verus Datum/site

## Dev Build
#### 1. Start GUI:
```bash
cd src/web
npm i
npm run dev
```
#### 2. Start API & DB
```bash
docker compose up vd-api vd-db --build
```

#### Debug: Run API locally
```bash
docker compose up vd-db --build
uvicorn api.main:app --host 0.0.0.0 --port 8081
```
> Note: This is not preferred and should only be used for debugging the API


### Stop services
```bash
docker compose down
```

## Test Production Build
Two options:
### A. Start GUI + Containers:
```
cd src/app
npm i
npm run build
npm run start
docker compose up vd-api vd-db --build
```
or
### B. Start everything containerized
```
docker compose up --build
```

> Note: The API service is always dependent on the DB service; if they can't connect, the API will not start.
