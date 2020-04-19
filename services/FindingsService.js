const restService = require('./RestService');

exports.findByProjectUuid = (projectUuid) => {
    const urlPath = `/api/v1/finding/project/${projectUuid}`;
    return restService.get(urlPath, {});
}
