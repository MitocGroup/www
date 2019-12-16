'use strict';

const url = require('url');
const AWS = require('aws-sdk');
const Jimp = require('jimp');
const https = require('https');
const dateFormat = require('dateformat');
const path = require('path');
const config = require('./.config.json');
const s3 = new AWS.S3();

/**
 * Medium feed retrieve and optimize images
 * @param event
 * @param context
 */
exports.handler = (event, context) => {
  apiRequest().then(res => {
    let rawPosts = parseResponse(res);

    if (!rawPosts) {
      return context.fail('No items to handle');
    }

    let posts = handlePosts(rawPosts);
    let images = posts.map(item => item.image.replace(/^.*?(?=[0-9]+\*)/,""));

    Promise.all(images.map(image => optimizeImage(image))).then((buffers) => {
      return Promise.all(buffers.map((imgBuffer, index) =>
        s3.upload({
          Bucket: config.destBucket,
          Key: `images/medium/${images[index]}`,
          Body: imgBuffer,
          CacheControl: 'max-age=604800'
        }).promise()
      ));
    }).then(() =>
      s3.putObject({
        Bucket: config.destBucket,
        Key: 'json/medium-feed.json',
        Body: JSON.stringify(posts),
        CacheControl: 'max-age=604800'
      }).promise()
    ).then(() => {
      context.succeed('OK');
    }).catch(err => {
      context.fail(err);
    });
  }).catch(err => {
    context.fail(err);
  });
};

/**
 * Get full image url
 * @param imageName
 * @returns {string}
 */
function getImageUrl(imageName) {
  const mediumImageCdn = 'https://cdn-images-1.medium.com';
  return url.resolve(mediumImageCdn, `max/${config.maxImageWidth}/${imageName}`);
}

/**
 * Optimize images
 * @param imageName
 * @returns {Promise<Buffer>}
 */
function optimizeImage(imageName) {
  return new Promise((resolve, reject) => {
    Jimp.read(getImageUrl(imageName)).then(image => {
      image
        .quality(60)
        .getBuffer(Jimp.MIME_JPEG, (err, buffer) => {
          if (err) {
            return reject(err);
          }
          resolve(buffer);
        });
    }).catch(function(err) {
      reject(err);
    });
  });
}
// //** */
// /**
//  * Handle and transform raw posts
//  * @param rawPosts
//  * @returns {Array}
//  */
// function handlePosts(rawPosts) {
//   let posts = [];
//   let post = '';
//   for (let i = 0; i < config.feedItemsToShow; i++) {
//     for (let prop in rawPosts.items[i]) {
//       post = rawPosts.items[i];
//   }
//   posts.push({
//     title: post.title,
//     url: post.link,
//     description: post.description,
//     image: post.thumbnail,
//     localimage: path.join('static', 'img', 'medium', post.thumbnail.replace(/^.*?(?=[0-9]+\*)/,"")),
//     publishedAt: dateFormat(post.pubDate, 'mmm dd, yyyy')
//    });
//   }
//   return posts;
// }

// /**
//  * Validate and parse API response
//  * @param response
//  * @returns {*}
//  */
// function parseResponse(response) {
//   if (!response.status) {
//     return false;
//   }

//   return response;
// }

// /**
//  * Call medium API
//  * @returns {Promise}
//  */
// function apiRequest() {
//   return new Promise((resolve, reject) => {

//     https.get('https://api.rss2json.com/v1/api.json?rss_url=https://blog.mitocgroup.com/feed', res => {
//       let rawData = '';

//       res.on('data', data => {rawData += data;});
//       res.on('end', () => {
//         // Remove anti JSON hijacking prefix
//         resolve(JSON.parse(rawData.replace('])}while(1);</x>', '')));
//       });
//     }).on('error', err => {
//       reject(err);
//     });
//   });
// }
