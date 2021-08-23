#!/bin/bash

name="idlehosting"
commit="latest"
registry="dhruv1035"

if ! grep -qs "$commit" <<<"$(docker image ls | grep "$name")"
then
  echo "Pulling $registry/$name:$commit"
  docker pull "$registry/$name:$commit"
  docker tag "$registry/$name:$commit" "$name:$commit"
  docker tag "$name:$commit" "$name:latest"
fi

if grep -qs "$name" <<<"$(docker container ls --filter 'status=running' --format '{{.Names}}')"
then
  echo "Stopping container $name"
  docker container stop $name
  docker container rm $name
fi

certs_dir="$(pwd)/.certs"
mkdir -p "$certs_dir"

echo "Running $name container in the background"
docker run \
  --name="$name" \
  --volume="$certs_dir:/etc/letsencrypt" \
  --publish="80:80" \
  --publish="443:443" \
  "$name:$commit" &