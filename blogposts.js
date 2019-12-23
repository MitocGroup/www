'use strict';

const fs = require('fs');
const btoa = require('btoa');
const showdown = require('showdown');
const markdowneyjr = require('markdowneyjr');

const bucket = 'www-dev.mitocgroup.com';
const domain = 'images.mitocgroup.com';

function getQuery(bucket, key, width) {
  return `{
    "bucket": "${bucket}",
    "key": "${key}",
    "edits": {
      "resize": {
        "width": ${width},
        "fit": "outside"
      }
    }
  }`;
}

const classMap = {
  ol: 'graf graf-ol-li graf-grap',
  ul: 'graf graf--li graf-grap',
  p: 'graf graf-up margin-bottom-25',
  tr: 'graf graf--li graf-grap',
  table: 'table',
  td: 'center',
  blockquote: 'green-blockquote'
};

const bindings = Object.keys(classMap).map((key) => ({
  type: 'output',
  regex: new RegExp(`<${key}>`, 'g'),
  replace: `<${key} class="${classMap[key]}">`
}));

const converter = new showdown.Converter({
  extensions: [ ...bindings ],
  noHeaderId: true,
  tables: true,
  tasklists: true
});

const blogPostsFolder = './views/blog/posts/';
const regex = /.md$/;
let postsObj, mainData;

const imgOptimization = function (str) {
  let arr = [];
  let re = /<img.*?src=[\'"](.*?)[\'"].*?>/g;
  let item;

  while (item = re.exec(str)) {
    arr.push(item[1]);
  }
  let newContent = str;
  arr.forEach(item => {
    const ImagesSmartphonePortrait = `https://${domain}/${btoa(getQuery(bucket, item.substr(1), 320).toString())}`;
    const ImagesSmartphoneLandscape = `https://${domain}/${btoa(getQuery(bucket, item.substr(1), 480).toString())}`;
    const ImagesTabletPortrait = `https://${domain}/${btoa(getQuery(bucket, item.substr(1), 700).toString())}`;
    const ImagesTabletLandscape = `https://${domain}/${btoa(getQuery(bucket, item.substr(1), 960).toString())}`;
    const newSrc = `${ImagesSmartphonePortrait} 320w,
    ${ImagesSmartphoneLandscape} 480w,
    ${ImagesTabletPortrait} 700w,
    ${ImagesTabletLandscape} 920w`;
    const sizes = 'sizes=\"100vw\"';
    const regEx = new RegExp(`src=[\'"](?:\s*)${item}(?:\s*)[\'"]`, 'gi');

    newContent = newContent.split(regEx).join(`srcset=\"${ newSrc }\" ${ sizes } `);
    
  });
  return newContent;
};

const posts = fs.readdirSync(blogPostsFolder);
posts.forEach((directory) => {
  if (fs.statSync(`${blogPostsFolder}/${directory}`).isDirectory()) {
    const months = fs.readdirSync(`${blogPostsFolder}/${directory}`);
    months.forEach((month) => {
      if (fs.statSync(`${blogPostsFolder}/${directory}/${month}`).isDirectory()) {
        const files = fs.readdirSync(`${blogPostsFolder}/${directory}/${month}`);
        files.forEach((post) => {
          if (regex.test(post)) {
            let fileContent = fs.readFileSync(`${blogPostsFolder}/${directory}/${month}/${post}`).toString();
            const dict = fileContent.substr(0, fileContent.indexOf('---'));
            let content = fileContent.substr(fileContent.indexOf('---') + 3);
            content = imgOptimization(content);
            mainData = markdowneyjr(dict, {});

            let wordCount = (content + mainData.description).replace(/[^\w ]/g, '').split(/\s+/).length;
            let readingTimeInMinutes = Math.floor(wordCount / 250) + 1;
            let result = `~ ${readingTimeInMinutes} min read`;
            const object = {
              ...mainData,
              minRead: result,
              htmlCode: converter.makeHtml(content)
            };
            const id = `${post}`.split('.md').find((it) => it !== null);

            postsObj = { ...postsObj, [id]: object };
          }
        });
      }
    });
  }
});

let sortedPostObj = Object.keys(postsObj)
  .sort((a, b) => {
    return -(new Date(postsObj[a].publicationDate) - new Date(postsObj[b].publicationDate));
  })
  .reduce((prev, curr) => {
    const event = new Date(postsObj[curr].publicationDate);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    prev[curr] = postsObj[curr];
    prev[curr].publicationDate = event.toLocaleDateString('en-EN', options);
    return prev;
  }, {});

fs.writeFileSync('./static/json/posts.json', JSON.stringify(sortedPostObj) + '\n');
