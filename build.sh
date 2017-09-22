#!/usr/bin/env bash

BUILD_FOLDER='./build/Release'
ENV=$([ -n "$1" ] && echo "$1" || echo 'test')

echo "Minifying css code"
cssnano < ./css/index.css > ./css/index.min.css
cssnano < ./css/slick.css > ./css/slick.min.css
cssnano < ./css/slick-theme.css > ./css/slick-theme.min.css

echo "Minifying js code"
uglifyjs ./js/blog.js -c -m -o ./js/blog.min.js
uglifyjs ./js/classie.js -c -m -o ./js/classie.min.js
uglifyjs ./js/main.js -c -m -o ./js/main.min.js

echo "Copying resources into '${BUILD_FOLDER}' folder"
rm -rf ${BUILD_FOLDER}/*
mkdir -p ${BUILD_FOLDER}/

if [ ${ENV} != 'prod' ]; then
    cp robots-test.txt ${BUILD_FOLDER}/robots.txt
else
    cp robots.txt ${BUILD_FOLDER}/robots.txt
    cp sitemap.xml ${BUILD_FOLDER}/sitemap.xml
fi

cp -R favicon.ico css fonts images js \
	${BUILD_FOLDER}/

echo "Minifying html code"
for html_file in $(find . -type f -name "*.html"); do
    html_file_build_path=$(dirname ${html_file})
    mkdir -p ${BUILD_FOLDER}/${html_file_build_path}
    html-minifier --collapse-whitespace --remove-comments ${html_file} -o ${BUILD_FOLDER}/${html_file}
done

echo "Build: Done"
