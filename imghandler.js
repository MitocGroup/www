/* eslint-disable no-useless-escape */
'use strict';

const btoa = require('btoa');

const bucket = 'www-dev.mitocgroup.com';
const domain = 'images.mitocgroup.com';

// Main Image Handler Section

function getQuery(bucket, key, width, height) {
  let query = `{
    "bucket": "${bucket}",
    "key": "${key}",
    "edits": {
      "resize": {
        "width": ${width},`;
  if (height) {
    query += `
        "height": ${height},`;
  }
  query += `
        "fit": "outside"
      }
    }
  }`;

  return query;
}

function imgSrcSet(imageKey, height) {
  const ImagesSmartphonePortrait = `https://${domain}/${btoa(getQuery(bucket, imageKey.substr(1), 320, height).toString())}`;
  const ImagesSmartphoneLandscape = `https://${domain}/${btoa(getQuery(bucket, imageKey.substr(1), 480, height).toString())}`;
  const ImagesTabletPortrait = `https://${domain}/${btoa(getQuery(bucket, imageKey.substr(1), 700, height).toString())}`;
  const ImagesTabletLandscape = `https://${domain}/${btoa(getQuery(bucket, imageKey.substr(1), 960, height).toString())}`;
  const ImagesDesktop = `https://${domain}/${btoa(getQuery(bucket, imageKey.substr(1), 1700, height).toString())}`;

  const newSrc = `${ImagesSmartphonePortrait} 320w,
  ${ImagesSmartphoneLandscape} 480w,
  ${ImagesTabletPortrait} 700w,
  ${ImagesTabletLandscape} 920w,
  ${ImagesDesktop} 1700w`;

  return (`srcset=\"${newSrc}\"`);
};

// Case Studies Img Handler Section

const caseStudies = [
  { imgKey: '/images/v2/png/terrahub.png', title: 'TerraHub' },
  { imgKey: '/images/v2/png/insurance-png.png', title: 'Major Insurance Company' },
  { imgKey: '/images/v2/png/analytics-company.png', title: 'Major Content Analytics Company' },
  { imgKey: '/images/v2/png/case-study1-png.png', title: 'Major Broadcasting Conglomerate' },
  { imgKey: '/images/v2/png/entertainment-company.png', title: 'Major Media &amp; Entertainment Company' },
  { imgKey: '/images/v2/png/publishing-conglomerate.png', title: 'Major Publishing Conglomerate' },
  { imgKey: '/images/v2/png/adtechmedia.png', title: 'AdTechMedia' },
  { imgKey: '/images/v2/png/manning.png', title: 'Manning Publications' }
];

function caseStudiesImgSrcSet() {
  const imgSet = [];
  caseStudies.forEach(obj => {
    imgSet.push(imgSrcSet(obj.imgKey, 300));
  });
  return imgSet;
};

// Other pages images

const imgKeysSrcSet = {
  '/images/v2/png/terrahub.png': '',
  '/images/v2/png/data-png.png': '',
  '/images/v2/png/infrastructure.png': '',
  '/images/v2/png/serverless.png': '',
  '/images/v2/png/serverless-png.png': '',
  '/images/v2/png/serverless_1.png': '',
  '/images/v2/png/2ndwatch.png': '',
  '/images/v2/png/aws-png.png': '',
  '/images/v2/png/aws-architecture.png': '',
  '/images/v2/illustration/google-map.png': '',
  '/images/v2/png/google-png.png': '',
  '/images/v2/case-studies/adtechmedia.png': '',
  '/images/v2/case-studies/monetization.png': '',
  '/images/v2/case-studies/devices.png': '',
  '/images/v2/case-studies/serverless-architectures-on-aws.png': '',
  '/images/v2/png/analytics-company.png': '',
  '/images/v2/png/case-study1-png.png': '',
  '/images/v2/png/insurance-png.png': '',
  '/images/v2/png/entertainment-company.png': '',
  '/images/v2/png/publishing-conglomerate.png': '',
  '/images/v2/png/about-png.png': '',
  '/images/v2/png/about2-png.png': ''
};

function getOptimizesImg() {
  Object.keys(imgKeysSrcSet).forEach(key => {
    imgKeysSrcSet[key] = imgSrcSet(key);
  });

  return imgKeysSrcSet;
};

module.exports = {
  imgSrcSet: imgSrcSet,
  caseStudiesImg: caseStudiesImgSrcSet,
  getImages: getOptimizesImg
};
