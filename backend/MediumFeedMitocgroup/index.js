'use strict';

const https = require('https');
const dateFormat = require('dateformat');

exports.handler = (event, context) => {
  let posts = [];
  let itemsCount = 3;
  let options = {
    host: 'medium.com',
    port: 443,
    path: `/@mitocgroup/latest?limit=60`, // @todo: investigate and implement pagination
    headers: {
      'Accept': 'application/json'
    }
  };

  apiRequest(options).then(res => {
    let posts = parseResponse(res, itemsCount);

    console.log(posts);

    context.succeed('OK');
  }).catch(err => {
    context.fail(err);
  });
};

function parseResponse(response, limitToShow) {
  if (!response.success) {
    return false;
  }

  if (!response.payload.references.hasOwnProperty('Post')) {
    return false;
  }

  let posts = [];
  let mitocGroupCollectionId = 'd770bafd0445';
  let rawPosts = response.payload.references.Post;

  for (let postId in rawPosts) {
    if (posts.length >= limitToShow) {
      break;
    }

    if (rawPosts.hasOwnProperty(postId)) {
      let post = rawPosts[postId];

      if (post.homeCollectionId === mitocGroupCollectionId) {
        posts.push({
          id: postId,
          title: post.title,
          description: post.content.subtitle,
          image: post.virtuals.previewImage.imageId,
          publishedAt: dateFormat(post.latestPublishedAt, 'mmm dd, yyyy')
        });
      }
    }
  }

  return posts;
}

function apiRequest(options) {
  return new Promise((resolve, reject) => {
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
