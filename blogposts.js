'use strict';

const fs = require('fs');
const markdowneyjr = require('markdowneyjr');
const showdown = require('showdown');

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
            const content = fileContent.substr(fileContent.indexOf('---') + 3);

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
