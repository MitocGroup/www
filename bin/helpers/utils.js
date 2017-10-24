'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const appPath = path.join(__dirname, '../../');

/**
 * Run child shell command
 * @param cmd
 * @param filerRegexp
 * @returns {Promise}
 */
function runChildCmd(cmd, filerRegexp = /.*/) {
  return new Promise((resolve, reject) => {
    let err = new Error(cmd);
    let childCmd = spawn(cmd, { shell: true, cwd: appPath });

    childCmd.stdout.on('data', data => {
      filterLog(data.toString(), filerRegexp);
    });

    childCmd.stderr.on('data', error => {
      err.message = error.toString();
      filterLog(error.toString(), filerRegexp);
    });

    childCmd.on('exit', code => {
      return (code === 1) ? reject(err) : resolve(code);
    });
  });
}

/**
 * Print filtered output
 * @param str
 * @param regexp
 */
function filterLog(str, regexp) {
  if (regexp.test(str)) {
    console.log(str.trim());
  }
}

exports.runChildCmd = runChildCmd;

/**
 * Find files recursively from directory
 * @returns {*}
 */
function walkDir(dir, filter, callback) {
  if (!fs.existsSync(dir) || /node_modules/.test(dir) || /dist/.test(dir)) {
    return;
  }

  let files = fs.readdirSync(dir);

  for (let i = 0; i < files.length; i++) {
    let filename = path.join(dir, files[i]);
    let stat = fs.lstatSync(filename);

    if (stat.isDirectory()) {
      walkDir(filename, filter, callback);
    } else if (filter.test(filename)) {
      callback(filename);
    }
  }
}

exports.walkDir = walkDir;

/**
 * Timeout promise
 * @param time
 * @returns {Promise}
 */
function timeoutPromise(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(); }, time);
  });
}

exports.timeoutPromise = timeoutPromise;
