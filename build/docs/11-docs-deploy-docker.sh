#!/bin/bash
. .build-env
echo "------------------------------------------"
echo "11-docs-deploy-docker.sh"
echo " - REPO_URL    = $REPO_URL"
echo " - AWS_PROFILE = $AWS_PROFILE"
echo "------------------------------------------"

docker login -u AWS -p $(aws ecr get-login-password --profile $AWS_PROFILE) $REPO_URL
docker push $REPO_URL/lib-tree.liquicode.com
