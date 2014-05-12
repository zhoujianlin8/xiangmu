#!/bin/bash
version=$1
echo $version

git add .
git commit -a -m "quick submit from robets"
git push origin daily/$version
