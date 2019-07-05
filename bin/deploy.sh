#!/usr/bin/env bash

aws --version > /dev/null 2>&1 || { echo >&2 "aws is missing. aborting..."; exit 1; }
npm --version > /dev/null 2>&1 || { echo >&2 "npm is missing. aborting..."; exit 1; }
git --version > /dev/null 2>&1 || { echo >&2 "git is missing. aborting..."; exit 1; }
terrahub --version > /dev/null 2>&1 || { echo >&2 "terrahub is missing. aborting..."; exit 1; }

export NODE_PATH="$(npm root -g)"
export npm_config_unsafe_perm="true"
export DEBUG="debug"

if [ -z "${BRANCH_FROM}" ]; then BRANCH_FROM="dev"; fi
if [ -z "${BRANCH_TO}" ]; then BRANCH_TO="dev"; fi

THUB_OPTS=""
if [ "${BRANCH_TO}" != "dev" ]; then THUB_OPTS="${THUB_OPTS} -e ${BRANCH_TO}"; fi
if [ "${BRANCH_TO}" != "${BRANCH_FROM}" ]; then THUB_OPTS="${THUB_OPTS} -g ${BRANCH_TO}..${BRANCH_FROM}"; fi
if [ "${THUB_STATE}" == "build" ]; then THUB_OPTS="${THUB_OPTS} -b"; fi
if [ "${THUB_STATE}" == "build&approve" ]; then THUB_OPTS="${THUB_OPTS} -b -a"; fi
if [ "${THUB_STATE}" == "approve" ]; then THUB_OPTS="${THUB_OPTS} -a"; fi
if [ "${THUB_STATE}" == "approve&destroy" ]; then THUB_OPTS="${THUB_OPTS} -a -d"; fi
if [ "${THUB_STATE}" == "destroy" ]; then THUB_OPTS="${THUB_OPTS} -d"; fi
if [ ! -z "${THUB_INCLUDE}" ]; then THUB_OPTS="${THUB_OPTS} -I \"^(${THUB_INCLUDE})\""; fi
if [ ! -z "${THUB_EXCLUDE}" ]; then THUB_OPTS="${THUB_OPTS} -X \"^(${THUB_EXCLUDE})\""; fi

echo "EXEC: git checkout ${BRANCH_TO}"
git checkout ${BRANCH_TO}
echo "EXEC: git checkout ${BRANCH_FROM}"
git checkout ${BRANCH_FROM}

AWS_ACCOUNT_ID="$(aws sts get-caller-identity --output=text --query='Account')"
terrahub configure -c template.locals.account_id="${AWS_ACCOUNT_ID}"

echo "EXEC: terrahub run -y ${THUB_OPTS}"
terrahub run -y ${THUB_OPTS}
