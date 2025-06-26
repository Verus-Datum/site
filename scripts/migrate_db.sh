#!/usr/bin/env bash
set -e

while getopts "m:" opt; do
  case $opt in
    m) REV_MSG="$OPTARG" ;;
    *) echo "Usage: $0 -m \"revision message\""; exit 1 ;;
  esac
done

if [ -z "$REV_MSG" ]; then
  echo "Error: a revision message is required."
  echo "Usage: $0 -m \"Your message here\""
  exit 1
fi

alembic revision --autogenerate -m "$REV_MSG"
alembic upgrade head
