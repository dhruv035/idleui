
name="idlehosting"
commit="latest"
registry="dhruv1035"

npm run build
echo "Tagging $name:$commit"
docker tag "$name:latest" "$name:$commit"
echo "Tagging $registry/$name:$commit"
docker tag "$name:$commit" "$registry/$name:$commit"
echo "Pushing $registry/$name:$commit"
docker push "$registry/$name:$commit"
