#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { runChildCmd } = require('../helpers/utils');

const env = process.env.DEPLOY_ENV || 'test';
const bucket = 'atm-deploy-caches';
const prefix = 'atm-website/npm-registry';
const cacheDir = path.join(process.env.HOME, '.npm_lazy');
const configPath = path.join(__dirname, '../../', 'npm_lazy.config.js');

/**
 * Parent message handler
 */
process.on('message', (event) => {
  switch(event.name) {
    case 'get-config': getConfig(); break;
    case 'configure': configure(); break;
    case 'run-registry': runRegistry(); break;
    case 'exit': onExit(); break;
  }
});

/**
 * Build and send config object
 */
function getConfig() {
  process.send({
    cacheDir: cacheDir,
    configPath: configPath,
    pullCommand: `aws s3 sync s3://${bucket}/${prefix} ${cacheDir} --delete`,
    pushCommand: `aws s3 sync ${cacheDir} s3://${bucket}/${prefix} --delete`
  });
}

/**
 * Run local npm registry
 */
function runRegistry() {
  runChildCmd(`npm_lazy --config ${configPath}`, /.*(Reusing).*/).then(() => {
    console.log('npm_lazy server stopped');
  })
}

/**
 * Configure local registry for environment
 */
function configure() {
  Promise.all([
    runChildCmd('npm config set registry http://localhost:8080/'),
    runChildCmd(`rm -rf ${cacheDir} && mkdir ${cacheDir}`)
  ]).then(() => {
    console.log('Local npm registry configured');
  });

  fs.writeFileSync(
    configPath,
    `module.exports = {
      loggingOpts: { 
        logRequesterIP: true,
        logToConsole: true
      },
      readOnly: ${['master', 'stage'].includes(env)},
      cacheDirectory: '${cacheDir}',
      cacheAge: 9999999999,
      httpTimeout: 4000,
      maxRetries: 2,
      externalUrl: 'http://localhost:8080',
      remoteUrl: 'https://registry.npmjs.com/',
      port: 8080,
      host: '0.0.0.0',
      proxy: {}
    };`
  );
}

/**
 * Reset registry config and exit
 */
function onExit() {
  runChildCmd('npm config delete registry').then(() => {
    process.exit(0);
  });
}
