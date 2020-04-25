var mockApis = require('./mockApis');

exports.resetMocks = () => {
  mockApis.reset();
}

exports.uploadBomOK = () => {
    const tokenValue = "ABC-ABC-ABC-ABC-ABC";
    mockApis.mockPutBom(200, {"token": tokenValue});
    mockApis.mockBomIsProcessing(tokenValue, 200, {'processing': false});
}

exports.uploadBomNotFound = () => {
    const tokenValue = "ABC-ABC-ABC-ABC-ABC";
    mockApis.mockPutBom(404, "");
    mockApis.mockBomIsProcessing(tokenValue, 200, {'processing': false});
}

exports.uploadBomUnauthorized = () => {
  mockApis.mockPutBom(401, "");
}

exports.deleteProjectOK = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockDeleteProjectByUuid(projectUuid, 200, "");
}

exports.deleteProjectWithProjectUuidNotFoundResponse = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockDeleteProjectByUuid(projectUuid, 404, "");
}

exports.deleteProjectUnauthorized = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockDeleteProjectByUuid(projectUuid, 401, "");
}

exports.deleteProjectWithEmptyListResponse = () => {
  mockApis.mockFindProjectByName('Dummy Project', 200, []);
}

exports.deleteProjectWithWrongVersionResponse = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '2.0'}]);
}

generateMetricsResponse = (critical = 0, high = 0, medium = 0, low = 0) => {
  return {
    "critical": critical,
    "high": high,
    "medium": medium,
    "low": low,
    "unassigned": 0,
    "vulnerabilities": (critical + high + medium + low),
    "vulnerableComponents": 0,
    "components": 945,
    "suppressed": 0,
    "findingsTotal": (critical + high + medium + low),
    "findingsAudited": 0,
    "findingsUnaudited": 0,
    "inheritedRiskScore": 0,
    "firstOccurrence": 1586746638543,
    "lastOccurrence": 1587263905885
  };
}

exports.metricsWithoutVulnerabilities = () => {
  const metricsResponse = generateMetricsResponse();
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockMetrics(projectUuid, 200, metricsResponse);
}

exports.metricsWithVulnerabilities = () => {
  const metricsResponse = generateMetricsResponse(100, 80, 60, 40);
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockMetrics(projectUuid, 200, metricsResponse);
}

exports.metricsNotFound = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockMetrics(projectUuid, 404, "");
}

exports.metricsUnauthorized = () => {
  const projectUuid = 'XYZ-OPQ';
  mockApis.mockFindProjectByName('Dummy Project', 200, [{'uuid': projectUuid, 'version': '1.0'}]);
  mockApis.mockMetrics(projectUuid, 401, "");
}
