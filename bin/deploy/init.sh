#!/usr/bin/env bash

setup_variables() {
    export HOTFIX=0
    export DEPLOY_ENV=${TRAVIS_BRANCH}
    export DEPLOY_HOST="https://www.mitocgroup.com"

    case ${DEPLOY_ENV} in
        dev | test | stage )
            DEPLOY_HOST="https://www-test.mitocgroup.com"
        ;;
    esac

    if [[ ${TRAVIS_PULL_REQUEST_BRANCH} =~ ^hotfix ]]; then HOTFIX=1; fi
}

ensure_required_deps() {
    pip install --user awscli > /dev/null

    NPM_BIN=`which npm`
    REQUIRED_DEPS=(
        deepify
        recink
        recink-codeclimate
        recink-snyk
        recink-pagespeed
        aws-sdk
        mitocgroup/npm_lazy
        uglify-js
        uglify-es
        uglifyjs-webpack-plugin
        mishoo/UglifyJS2#harmony-v2.8.22
        webpack
        html-minifier
        cssnano-cli
    );

    for DEP in ${REQUIRED_DEPS[@]}; do
        if [ ! -d "$(${NPM_BIN} root -g)/${DEP}" ]; then
            echo "Installing missing ${DEP}"
            ${NPM_BIN} install -g ${DEP} || (echo "Failed to install ${DEP}" && exit 1)
        fi
    done
}

setup_git() {
    git config user.name "Travis CI"
    git config user.email "travis@mitocgroup.com"
    git remote set-url origin "https://${GITHUB_ACCESS_TOKEN}@github.com/MitocGroup/www.git"
    git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
    git fetch origin dev
    git fetch origin ${DEPLOY_ENV}
}

setup_npm() {
    npm config set depth 0
    npm link aws-sdk
}

echo "Setting up travis variables"
setup_variables
echo "Installing required dependencies"
ensure_required_deps
echo "Setting up git client"
setup_git
echo "Setting up NPM config"
setup_npm
