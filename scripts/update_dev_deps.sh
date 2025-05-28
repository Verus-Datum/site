#!/usr/bin/env bash
set -euo pipefail

# combine requirements, exclude psycopg2
cat ./**/*/requirements.txt .devcontainer/requirements.in \
  | grep -v -E '^(#|$|psycopg2)' \
  | sort -u \
  > .devcontainer/mono-requirements.in

# add psycopg2-binary
echo 'psycopg2-binary' >> .devcontainer/mono-requirements.in

uv pip compile .devcontainer/mono-requirements.in \
    --output-file .devcontainer/requirements.txt

rm .devcontainer/mono-requirements.in
