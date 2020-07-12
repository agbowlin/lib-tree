#!/bin/bash
. .build-env
echo "------------------------------------------"
echo "10-docs-build-docker.sh"
echo " - REPO_URL    = $REPO_URL"
echo " - AWS_PROFILE = $AWS_PROFILE"
echo "------------------------------------------"

docker build -t lib-tree.liquicode.com:latest . --file lib-tree.liquicode.com.dockerfile
docker tag lib-tree.liquicode.com:latest $REPO_URL/lib-tree.liquicode.com
