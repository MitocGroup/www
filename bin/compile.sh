#!/bin/bash

## Setup environmental variables
if [ -f .terrahub_build.env ]; then . .terrahub_build.env; fi

## Validate environmental variables
if [ -z "${THUB_S3_PATH}" ]; then
  echo 'ERROR: THUB_S3_PATH variable is empty. Aborting...'
  exit 1
fi

if [ -z "${THUB_BUILD_PATH}" ]; then
  echo 'ERROR: THUB_BUILD_PATH variable is empty. Aborting...'
  exit 1
fi

## Check if the project must be built
if [ "${THUB_BUILD_OK}" == "true" ]; then
  echo "THUB_BUILD_OK='${THUB_BUILD_OK}' ==> Starting build process."
  npm --version > /dev/null 2>&1 || { echo >&2 'ERROR: npm is missing. Aborting...'; exit 1; }
  npm config set depth 0 || { echo 'ERROR: Failed to run npm config'; exit 1; }
  npm install node-sass -g --unsafe-perm=true || { echo 'ERROR: Failed to run npm install node-sass -g'; exit 1; }
  npm install || { echo 'ERROR: Failed to run npm install'; exit 1; }
  npm run compile || { echo 'ERROR: Failed to run npm run compile'; exit 1; }
  npm run sitemap ${THUB_S3_PATH/s3/https} || { echo 'ERROR: Failed to run npm run sitemap'; exit 1; }
  mv ${THUB_BUILD_PATH}/404/index.html ${THUB_BUILD_PATH}/404.html
  if [ -z "${THUB_ROBOTS}" ]; then
    echo 'WARNING: THUB_ROBOTS variable is empty'
  else
    cp ${THUB_ROBOTS} ${THUB_BUILD_PATH}/robots.txt
  fi
  echo "THUB_BUILD_OK='${THUB_BUILD_OK}' ==> Finishing build process."
else
  echo "THUB_BUILD_OK='${THUB_BUILD_OK}' ==> Skipping build process."
fi
