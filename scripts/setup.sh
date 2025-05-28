#!/bin/bash
set -euo pipefail

set -a
source .devcontainer/dev.env
set +a

curl -LsSf https://astral.sh/uv/0.7.6/install.sh | sh

cd src/web/
npm install

cd ../../
uv pip install -r .devcontainer/requirements.txt
uv pip install -e src/api

export PYTHONPATH="$(pwd)/src/"
