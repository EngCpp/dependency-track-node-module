const readInstalled = require('read-installed');
const parsePackageJsonName = require('parse-packagejson-name');
const ssri = require('ssri');
const fs = require('fs');
const PackageURL = require('packageurl-js');
const bomService = require('./services/BomService')

exports.uploadbom = (path, apiKey, projectName, projectVersion, callback) => {
  bomService.upload('a','ABCXYZ','');
}
