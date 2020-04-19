const readInstalled = require('read-installed');
const parsePackageJsonName = require('parse-packagejson-name');
const ssri = require('ssri');
const fs = require('fs');
const packageURL = require('packageurl-js');
const bomService = require('./services/BomService');
const projectService = require('./services/ProjectService');
const findingsService = require('./services/FindingsService');
const metricsService = require('./services/MetricsService');
const {config} = require('./utils/Configurations');
const {showProgressBarAnimation} = require('./utils/MiscUtils')
const {isEmpty} = require('./utils/StringUtils')

const filterByProjectVersion = (projects) => {
  const {projectVersion} = config;

  if (isEmpty(projects)) {
    return null;
  }

  return projects.find(p => p.version == projectVersion);
}

const loadFile = (bomFilePath) => {
  try {
    return fs.readFileSync(bomFilePath, null, 'r');
  } catch (ex) {
    return null;
  }
}

checkVulnerability = (level, response) => {
  const {findingsThreshold} = config;
  const threshold = findingsThreshold[level];

  if (threshold >= 0 && response[level] >= threshold) {
    throw new Error(`${response[level]} ${level} vulnerabilities found`);
  }
}

const VULNERABILITY_LEVELS = ['critical', 'high', 'medium', 'low'];
exports.metrics = async(callback) => {
  const {projectName, projectVersion, findingsThreshold} = config
  const projects = await projectService.findByName(projectName);
  const project = filterByProjectVersion(projects);

  if (isEmpty(project)) {
    throw new Error(`Project [${projectName} - ${projectVersion}] not found`);
  }

  const response = await metricsService.findByProjectUuid(project.uuid);
  for (key in VULNERABILITY_LEVELS) {
    checkVulnerability(VULNERABILITY_LEVELS[key], response);
  }

  callback(response);
}


exports.findings = async(callback) => {
  const {projectName, projectVersion} = config
  const projects = await projectService.findByName(projectName);
  const project = filterByProjectVersion(projects);

  if (isEmpty(project)) {
    throw new Error(`Project [${projectName} - ${projectVersion}] not found`);
  }

  const response = await findingsService.findByProjectUuid(project.uuid);
  callback(response);
}

/**
* uploadbom will orchestrate all the calls required to upload a bom file to
* Dependency Track
*/
exports.uploadbom = async(callback) => {
  const {bomFilepath, projectName, projectVersion, waitUntilBomProcessingComplete, failOnError} = config

  if (!fs.existsSync(bomFilepath)) {
      throw new Error('Bom file not found.');
  }

  const bomFileBuffer = loadFile(bomFilepath);

  if (isEmpty(bomFileBuffer)) {
     throw new Error('Bom could not be loaded.');
  }

  const base64BomFile = bomFileBuffer.toString('base64');
  const {token} = await bomService.upload(projectName, projectVersion, base64BomFile);

  let isBeingProcessed = true;
  while (waitUntilBomProcessingComplete && isBeingProcessed) {
      const bomProcessedResponse = await bomService.isBeingProcessed(token);
      isBeingProcessed = bomProcessedResponse.processing;
      await showProgressBarAnimation("Processing BOM:", 5000);
  }

  callback({token});
}

exports.deleteProject = async(callback) => {
  const {projectName, projectVersion} = config
  const projects = await projectService.findByName(projectName);
  const project = filterByProjectVersion(projects);

  if (isEmpty(project)) {
    throw new Error(`Project [${projectName} - ${projectVersion}] not found`);
  }

  const response = await projectService.deleteByUuid(project.uuid);
  callback(response);
}
