const restService = require('./RestService');
const querystring = require('querystring');

exports.findByName = (projectName) => {
    const urlPath = '/api/v1/project';
    const params = querystring.stringify({
          'name': projectName,
          'excludeInactive': true
    });

    return restService.get(urlPath, params);
}

exports.deleteByUuid = (projectUuid) => {
  const urlPath = `/api/v1/project/${projectUuid}`;
  return restService.delete(urlPath, {});
}

exports.isBeingProcessed = (token) => {
  const urlPath = `/api/v1/bom/token/${token}`;
  return restService.get(urlPath, {});
}
