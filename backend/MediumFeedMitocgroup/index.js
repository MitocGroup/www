'use strict';

const url = require('url');
const AWS = require('aws-sdk');
const Jimp = require('jimp');
const https = require('https');
const dateFormat = require('dateformat');

const s3 = new AWS.S3();
const config = require('./config.json');

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
    let images = posts.map(item => item.image);

    Promise.all(images.map(image => optimizeImage(image))).then((buffers) => {
      return Promise.all(buffers.map((imgBuffer, index) =>
        s3.upload({
          Bucket: config.destBucket,
          Key: `images/medium/${images[index]}`,
          Body: imgBuffer}
        ).promise()
      ));
    }).then(() =>
      s3.putObject({
        Bucket: config.destBucket,
        Key: 'json/medium-feed.json',
        Body: JSON.stringify(posts)}
      ).promise()
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
    }).catch(function (err) {
      reject(err);
    });
  });
}

/**
 * Handle and transform raw posts
 * @param rawPosts
 * @returns {Array}
 */
function handlePosts(rawPosts) {
  let posts = [];
  for (let postId in rawPosts) {
    if (posts.length >= config.feedItemsToShow) {
      break;
    }

    if (rawPosts.hasOwnProperty(postId)) {
      let post = rawPosts[postId];

      if (post.homeCollectionId === config.collectionId) {
        posts.push({
          id: postId,
          title: post.title,
          url: `${config.blogDomain}/${post.uniqueSlug}`,
          description: post.content.subtitle,
          image: post.virtuals.previewImage.imageId,
          publishedAt: dateFormat(post.latestPublishedAt, 'mmm dd, yyyy')
        });
      }
    }
  }

  return posts;
}

/**
 * Validate and parse API response
 * @param response
 * @returns {*}
 */
function parseResponse(response) {
  if (!response.success || !response.payload.references.hasOwnProperty('Post')) {
    return false;
  }

  return response.payload.references.Post;
}

/**
 * Call medium API
 * @returns {Promise}
 */
function apiRequest() {
  return new Promise((resolve, reject) => {
    let options = {
      host: 'medium.com',
      port: 443,
      path: `/@mitocgroup/latest?limit=60`, // @todo: investigate and implement pagination
      headers: {
        'Accept': 'application/json'
      }
    };

    https.get(options, res => {
      let rawData = '';

      res.on('data', data => {rawData += data;});
      res.on('end', () => {
        // Remove anti JSON hijacking prefix
        resolve(JSON.parse(rawData.replace('])}while(1);</x>', '')));
      });
    }).on('error', err => {
      reject(err);
    });
  });
}
