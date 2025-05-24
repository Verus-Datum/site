#!/bin/bash

cat ./**/*/requirements.txt .devcontainer/requirements.in \
    | grep -v '^#' | grep -v '^$' \
    | sort -u > .devcontainer/mono-requirements.in

uv pip compile .devcontainer/mono-requirements.in \
    --output-file .devcontainer/requirements.txt \
    && rm .devcontainer/mono-requirements.in

uv pip install -e src/api
