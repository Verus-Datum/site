#!/bin/bash
# Setup script for devcontainers

curl -LsSf https://astral.sh/uv/0.7.6/install.sh | sh

cd src/web/
npm install

cd ../../
uv pip install -r .devcontainer/requirements.txt
