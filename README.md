# Verus Datum / site

## Dev Build
### Start GUI:
```bash
cd src/web
npm i
npm run dev
```
### Start API & DB
```bash
docker compose up vd-api vd-db --build
```


## Production Build
Two options:
### A. Start GUI + Containers:
```
cd src/app
npm i
npm run build
npm run start
docker compose up vd-api vd-db --build
```
### B. Start everything containerized
```
docker compose up --build
```

> Note that the API service is always dependent on the DB service; if they can't connect, the API will not start.
