const nock = require('nock');
const axios = require('axios');

exports.reset = () => {
  nock.cleanAll();
  nock.enableNetConnect();
}

const DEFAULT_HOST_NAME = 'http://localhost'

exports.mockPutBom = (status, responseBody) => {
    nock(DEFAULT_HOST_NAME)
    .put('/api/v1/bom')
    .reply(status, responseBody);
}

exports.mockBomIsProcessing = (token, status, responseBody) => {
    nock(DEFAULT_HOST_NAME)
    .get(`/api/v1/bom/token/${token}`)
    .reply(status, responseBody);
}

exports.mockFindProjectByName = (projectName, status, responseBody) => {
  nock(DEFAULT_HOST_NAME)
  .get(`/api/v1/project`, 'name=Dummy%20Project&excludeInactive=true')
  .reply(status, responseBody);
}

exports.mockDeleteProjectByUuid = (projectUuid, status, responseBody) => {
  nock(DEFAULT_HOST_NAME)
  .delete(`/api/v1/project/${projectUuid}`)
  .reply(status, responseBody);
}

exports.mockMetrics = (projectUuid, status, responseBody) => {
  nock(DEFAULT_HOST_NAME)
  .get(`/api/v1/metrics/project/${projectUuid}/current`)
  .reply(status, responseBody);
}
