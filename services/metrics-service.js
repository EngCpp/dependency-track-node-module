const restService = require('./rest-service');
const querystring = require('querystring');

/**
* Obtain current metrics by project uuid
*/
exports.findByProjectUuid = (projectUuid) => {
  const urlPath = `/api/v1/metrics/project/${projectUuid}/current`;
  return restService.get(urlPath, {});
}
