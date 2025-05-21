#!/bin/bash

cat ./**/*/requirements.txt \
    | grep -v '^#' | grep -v '^$' \
    | sort -u > .devcontainer/requirements.in

uv pip compile .devcontainer/requirements.in \
    --output-file .devcontainer/requirements.txt \
    && rm .devcontainer/requirements.in
