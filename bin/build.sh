#!/usr/bin/env bash

MY_DIR=$(cd -P -- "$(dirname -- "$0")" && pwd -P)
echo "## BUILD - MY_DIR: ${MY_DIR}"
CODE_DIR=$(dirname ${MY_DIR})
echo "## BUILD - CODE_DIR: ${CODE_DIR}"
BUILD_DIR=${MY_DIR}/build
echo "## BUILD - BUILD_DIR: ${BUILD_DIR}"
BRANCH=$([ -n "$1" ] && echo "$1" || echo 'dev')
echo "## BUILD - BRANCH: ${BRANCH}"

echo "Minifying css code"
cssnano < ${CODE_DIR}/css/index.css > ${CODE_DIR}/css/index.min.css
cssnano < ${CODE_DIR}/css/slick.css > ${CODE_DIR}/css/slick.min.css
cssnano < ${CODE_DIR}/css/slick-theme.css > ${CODE_DIR}/css/slick-theme.min.css

echo "Minifying js code"
uglifyjs ${CODE_DIR}/js/carousel.js -c -m -o ${CODE_DIR}/js/carousel.min.js
uglifyjs ${CODE_DIR}/js/main.js -c -m -o ${CODE_DIR}/js/main.min.js
uglifyjs ${CODE_DIR}/js/modal-effects.js -c -m -o ${CODE_DIR}/js/modal-effects.min.js
uglifyjs ${CODE_DIR}/js/jquery-mailchimp.js -c -m -o ${CODE_DIR}/js/jquery-mailchimp.min.js

echo "Copying resources into '${BUILD_DIR}' folder"
rm -rf ${BUILD_DIR}/*
mkdir -p ${BUILD_DIR}/

if [ ${BRANCH} != 'master' ]; then
    cp ${CODE_DIR}/robots-test.txt ${BUILD_DIR}/robots.txt
else
    cp ${CODE_DIR}/pgp-key.txt ${BUILD_DIR}/pgp-key.txt
    cp ${CODE_DIR}/robots.txt ${BUILD_DIR}/robots.txt
    cp ${CODE_DIR}/security.txt ${BUILD_DIR}/security.txt
    cp ${CODE_DIR}/sitemap.xml ${BUILD_DIR}/sitemap.xml
fi

cp -R ${CODE_DIR}/css ${CODE_DIR}/fonts ${CODE_DIR}/images \
    ${CODE_DIR}/js ${CODE_DIR}/json ${CODE_DIR}/favicon.ico ${BUILD_DIR}/

echo "Minifying html code"
for html_file in $(find ${CODE_DIR} -type f -name "*.html"); do
    html_file_build_path=$(dirname ${html_file})
    html_file_build_path="${html_file_build_path/$CODE_DIR/$BUILD_DIR}"
    mkdir -p ${html_file_build_path}
    html-minifier --collapse-whitespace --remove-comments ${html_file} \
        --output ${html_file_build_path}/$(basename ${html_file})
done
