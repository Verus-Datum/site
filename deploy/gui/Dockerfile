FROM node:22-bookworm AS build
WORKDIR /app

COPY src/web/package*.json ./

RUN npm ci

COPY ./src/web .

RUN npm run build


FROM node:22-bookworm AS run
WORKDIR /app

COPY --from=build /app/build ./
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "index.js"]
