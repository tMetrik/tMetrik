#!/bin/bash
docker compose -f docker-compose.clickhouse.yml up -d && \
docker compose -f docker-compose.clickhouse.yml logs -f
