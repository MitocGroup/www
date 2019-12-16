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
