const restService = require('./rest-service');

exports.findByProjectUuid = (projectUuid) => {
    const urlPath = `/api/v1/finding/project/${projectUuid}`;
    return restService.get(urlPath, {});
}
