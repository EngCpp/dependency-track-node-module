const restService = require('./RestService');
const querystring = require('querystring');

/**
* Obtain current metrics by project uuid
*/
exports.findByUuid = (projectUuid) => {
  const urlPath = `/api/v1/metrics/project/${projectUuid}/current`;
  return restService.get(urlPath, {});
}
