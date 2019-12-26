'use strict';

const YAML = require('js-yaml');
const fs = require('fs');

const doc = YAML.safeLoad(fs.readFileSync(process.argv[2], 'utf8'));

fs.writeFileSync('api-swagger.json', JSON.stringify(doc, null, 2), 'utf8');
console.log('api-swagger.json is ready.');

/*

////Update title
doc.info.title = 'TerraHub API Docs';

const methods = ['get', 'post'];

Object.keys(doc.paths).forEach(key => {
  ////Delete OPTIONS
  if (doc.paths[key].hasOwnProperty('options')) {
    delete doc.paths[key]['options'];
  }

  methods.forEach(method => {
    if (doc.paths[key].hasOwnProperty(method)) {
      ////Delete x-amazon-apigateway-integration and parameters
      delete doc.paths[key][method]['parameters'].splice(0, 3);
      delete doc.paths[key][method]['x-amazon-apigateway-integration'];

      ////Update parameters
      if (method === 'post' && doc.paths[key][method]['parameters'].length === 0 ) {
        doc.paths[key][method]['parameters'] = [
          {
            in: 'body',
            name: 'Empty',
            required: true,
            schema: {
              type: 'object',
              title: 'Empty Schema'
            }
          }
        ]
      }

      ////Update responses
      Object.keys(doc.paths[key][method]['responses']).forEach(params => {
        if (params !== '200' && params !== '301') {
          delete doc.paths[key][method]['responses'][params];
        }
      });
    }
  });
});

delete doc.definitions;

fs.writeFileSync('doc-swagger.yml', YAML.safeDump(doc), 'utf8');
console.log('doc-swagger.yml is ready.');

*/
