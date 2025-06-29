FROM postgres:17.5-bookworm

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=vd_db
ENV POSTGRES_INITDB_ARGS="--auth-local=trust --auth-host=trust"

# COPY deploy/postgres/initdb/*.sql /docker-entrypoint-initdb.d/

