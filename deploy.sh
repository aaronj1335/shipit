#!/bin/bash

set -e

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  echo "deploying to gh-pages"

  git config --global user.email "aaron.r.stacy@gmail.com"
  git config --global user.name "aaron stacy via travis-ci"

  rm -rf ~/gh-pages || true

  git clone --branch=gh-pages https://${GH_TOKEN}@github.com/aaronj1335/shipit.git  ~/gh-pages

  cp -r index.html css img js lib plugin ~/gh-pages/

  cd ~/gh-pages

  git add .

  if git commit -m "travis build $TRAVIS_BUILD_NUMBER pushed to gh-pages"; then
    git push -f origin gh-pages
    echo "finished deploying"
  else
    echo "nothing new to deploy"
  fi
fi
