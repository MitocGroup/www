#!/usr/bin/env bash

if [ -z $(which aws) ]; then
	echo 'aws cli must be installed on your PC'
	exit 1
fi

env=$([ -n "$1" ] && echo "$1" || echo 'dev')
region=$([ -n "$2" ] && echo "$2" || echo 'eu-central-1')
profile=$([ -n "$3" ] && echo "$3" || echo 'default')

message() {
    echo -e "\033[38;5;148m"$1"\033[39m"
}

message "You are going to deploy to '${env}' environment (region: ${region}), continue? [y|n]: "
read continue

if [ ${continue} != 'y' ]; then
    echo 'Exiting without deploy'
    exit 1
fi

message "Would like to install npm dependencies? [y|n]: "
read dependencies

if [ ${dependencies} == 'y' ]; then
    npm install html-minifier -g
    npm install cssnano-cli -g
    npm install uglify-js -g
fi

if [ ${env} != 'prod' ]; then
    bucket='s3://www-test.mitocgroup.com/'
    distribution_id='E2MR6WOVYGNOM0'
    max_age='600'
else
    bucket='s3://www.mitocgroup.com/'
    distribution_id='E17AX02BW6QRQO'
    max_age='604800'
fi

message "### Build: Start ###"
./build.sh ${env}

message "### Deploy: Start ###"
message "Synchronizing build/Release/"
aws s3 sync ./build/Release/ ${bucket} --region ${region} --profile ${profile} \
    --storage-class REDUCED_REDUNDANCY --metadata-directive REPLACE --cache-control max-age=${max_age} \
    --exclude 'backend/*' --exclude 'scss/*' --exclude 'build/*'

message "Invalidating CloudFront"
aws cloudfront create-invalidation --distribution-id ${distribution_id} --paths '/*'

message "Done"
