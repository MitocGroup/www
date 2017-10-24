#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cheerio = require('cheerio');
const fsExtra = require('fs-extra');
const UglifyJS = require('uglify-es');
const { minify } = require('html-minifier');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error(`Usage: 'node bin/travis/build.js <env>'`);
  exit(1);
}

const deployTo = args[0];
if (['dev', 'master'].indexOf(deployTo) < 0) {
  console.error(`<env> should be one of 'dev' or 'master'`);
  exit(1);
}

const { walkDir } = require('../helpers/utils');
const appSrc = path.join(__dirname, '../../');
const buildPath = path.join(appSrc, 'dist');

/* Start build script */

let pages = [];
walkDir(appSrc, /index.html/, page => pages.push(page));

fsExtra.ensureDirSync(`${buildPath}/js`);
fsExtra.ensureDirSync(`${buildPath}/css`);

let promises = pages.map(pagePath => {
  let destPage = pagePath.replace(appSrc, `${buildPath}/`);
  fsExtra.ensureDirSync(destPage.replace('index.html', ''));

  return optimizePage(pagePath, destPage);
});

moveAssets(['images', 'fonts', 'json', 'favicon.ico']);
if (deployTo !== 'master') {
  fsExtra.copySync(`${appSrc}/robots-test.txt`, `${buildPath}/robots.txt`);
} else {
  moveAssets(['pgp-key.txt', 'robots.txt', 'security.txt', 'sitemap.xml']);
}

Promise.all(promises).then(res => {
  console.log('Done!');
  exit(0);
}).catch(err => {
  console.error(err);
  exit(1);
});

/* End build script */

/**
 * Parse links from cheerio object
 * @param {object} $links
 * @param {string} type
 * @returns {Array}
 */
function parseLinks($links, type) {
  let links = [];

  for (let $item in $links) {
    if ($links.hasOwnProperty($item)) {
      if ($links[$item].attribs) {
        let assetPath = $links[$item].attribs[(type === 'css') ? 'href' : 'src'];
        links.push(path.join(appSrc, assetPath));
      }
    }
  }

  return links;
}

/**
 * Minify es5/es6 js
 * @param {string} fileName
 * @returns {Promise}
 */
function minifyJs(fileName) {
  return new Promise((resolve, reject) => {
    let result = UglifyJS.minify(fs.readFileSync(fileName, 'utf8'), {});

    if (result.error) {
      return reject(result.error);
    }

    resolve(result.code);
  });
}

/**
 * Bundle multiple files into one file
 * @param entryFiles
 * @param bundleFileName
 * @returns {*}
 */
function bundle(entryFiles, bundleFileName) {
  let outputPath = path.join(buildPath, bundleFileName);
  fs.writeFileSync(outputPath, `/* ${(new Date()).toISOString()} */`, 'utf8');

  if (!entryFiles.length) {
    return Promise.resolve(bundleFile);
  }

  return new Promise((resolve, reject) => {
    let promises = entryFiles.map(item => {
      if (/\.min\./.test(item) || /\.css/.test(item)) {
        return new Promise(resolve => {
          fs.readFile(item, 'utf8', (err, data) => {
            if (err) {
              return reject(err);
            }
            resolve(data);
          });
        });
      }

      return minifyJs(item);
    });

    Promise.all(promises).then(results => {
      results.forEach((data, key) => {
        fs.appendFileSync(outputPath, `\n ${data} \n`, 'utf8');
      });

      resolve(bundleFileName);
    }).catch(err => reject(err));
  });
}

/**
 * Parse and bundle assets from provided parent element
 * @param type
 * @param html
 * @param parentEl
 * @returns {Promise}
 */
function bundleLinks(type, html, parentEl) {
  const $ = cheerio.load(html);

  if (['css', 'js'].indexOf(type) < 0) {
    throw new Error('Wrong bundle type');
  }

  return new Promise((resolve, reject) => {
    let tmpHash = crypto.createHash('md5').update((new Date).toISOString()).digest('hex');
    let distHref = `${type}/${tmpHash}.min.${type}`;
    let searchEl = 'link[rel="stylesheet"]';
    let appendElm = `<link rel="stylesheet" href="/${distHref}"/>`;

    if (type === 'js') {
      searchEl = 'script[src]';
      appendElm = `<script src="/${distHref}"></script>`;
    }

    let $links = $(`${parentEl} ${searchEl}`);
    let absoluteHrefs = parseLinks($links, type);

    if (!absoluteHrefs.length) {
      return resolve($.html());
    }

    bundle(absoluteHrefs, distHref).then(() => {
      $links.remove();
      $(appendElm).appendTo(parentEl);

      resolve($.html());
    }).catch(err => reject(err));
  });
}

/**
 * Optimize src page source
 * @param {string} srcPagePath
 * @param {string} destPagePath
 * @returns {Promise}
 */
function optimizePage(srcPagePath, destPagePath) {
  let html = fs.readFileSync(srcPagePath, 'utf8');
  return bundleLinks('css', html, 'head')
    .then(html => bundleLinks('css', html, 'body'))
    .then(html => bundleLinks('js', html, 'head'))
    .then(html => bundleLinks('js', html, 'body'))
    .then(html => {
      return new Promise((resolve, reject) => {
        fs.writeFile(
          destPagePath,
          minify(html, {
            removeComments: true,
            collapseWhitespace: true,
            removeStyleLinkTypeAttributes: true
          }),
          'utf8',
          () => resolve()
        );
      });
    })
  ;
}

/**
 * Move assets to the build path sync
 * @param {Array} assets
 */
function moveAssets(assets) {
  assets.forEach(item => {
    fsExtra.copySync(`${appSrc}/${item}`, `${buildPath}/${item}`);
  });
}

/**
 * Garbage collection
 * @param code
 */
function exit(code) {
  process.exit(code);
}
