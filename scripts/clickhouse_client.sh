#!/bin/bash
docker compose -f docker-compose.clickhouse.yml exec clickhouse clickhouse-client
