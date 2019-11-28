'use strict';

const fs = require('fs');
const markdowneyjr = require('markdowneyjr');
const showdown = require('showdown');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const classMap = {
  ol: 'graf graf-ol-li graf-grap',
  ul: 'graf graf--li graf-grap',
  p: 'graf graf-up'
};

const bindings = Object.keys(classMap).map((key) => ({
  type: 'output',
  regex: new RegExp(`<${key}>`, 'g'),
  replace: `<${key} class="${classMap[key]}">`
}));

const converter = new showdown.Converter({
  extensions: [ ...bindings ],
  noHeaderId: true
});

const blogPostsFolder = 'views/blog/posts/';
const regex = /.md$/;
let postsObj = {},
  mainData = {};

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

            const object = {
              ...mainData,
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

fs.writeFileSync('static/json/posts.json', JSON.stringify(postsObj) + '\n');
