#!/bin/bash
KEYS_FILE=.keys
if [ ! -f $KEYS_FILE ]; then
    touch .keys
fi
docker compose build
