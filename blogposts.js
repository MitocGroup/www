/* eslint-disable no-useless-escape */
/* eslint-disable no-cond-assign */
'use strict';

const fs = require('fs');
const showdown = require('showdown');
const markdowneyjr = require('markdowneyjr');
const { imgSrcSet } = require('./imghandler.js');

const mainDomain = 'www.mitocgroup.com';
const imgKeyRegExp = /<img.*?src=[\'"](.*?)[\'"].*?>/g;
const imgSrcRegExp = (imgKey) => new RegExp(`src=[\'"](?:\s*)${imgKey}(?:\s*)[\'"]`, 'gi');
const sizes = ' sizes=\"(max-width: 400px) 480px, (max-width: 620px): 700px, (max-width: 900px) 960px, 100vw\" ';
const imgClass = ' class=\"lazyload\" ';

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
  extensions: [...bindings],
  noHeaderId: true,
  tables: true,
  tasklists: true
});

const blogPostsFolder = './views/blog/posts/';
const regex = /.md$/;
let postsObj, mainData;

const imgOptimization = function(str) {
  let item;
  const arr = [];
  let newContent = str;

  while (item = imgKeyRegExp.exec(str)) {
    arr.push(item[1]);
  }
  arr.forEach(item => {
    const regEx = imgSrcRegExp(item);
    newContent = newContent.split(regEx).join(imgSrcSet(item) + sizes + imgClass);
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
            const fileContent = fs.readFileSync(`${blogPostsFolder}/${directory}/${month}/${post}`).toString();
            const dict = fileContent.substr(0, fileContent.indexOf('---'));
            let content = fileContent.substr(fileContent.indexOf('---') + 3);
            content = imgOptimization(content);
            mainData = markdowneyjr(dict, {});
            mainData.imgSrc = mainData.image;
            mainData.image = imgSrcSet(mainData.image.replace('https://' + mainDomain, '')) + sizes + imgClass;

            const wordCount = (content + mainData.description).replace(/[^\w ]/g, '').split(/\s+/).length;
            const readingTimeInMinutes = Math.floor(wordCount / 250) + 1;
            const result = `~ ${readingTimeInMinutes} min read`;
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

const sortedPostObj = Object.keys(postsObj)
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
