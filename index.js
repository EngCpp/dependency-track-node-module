const readInstalled = require('read-installed');
const parsePackageJsonName = require('parse-packagejson-name');
const ssri = require('ssri');
const fs = require('fs');
const PackageURL = require('packageurl-js');
const bomService = require('./services/BomService');
const projectService = require('./services/ProjectService');
const config = require('./utils/Configurations').defaultConfigs;
const {showProgressBarAnimation} = require('./utils/MiscUtils')

const filterByProjectVersion = (projects) => {
  const {projectVersion} = config;

  if (projects && projects.length > 0) {
    return projects.find(p => p.version == projectVersion);
  } else {
    return null;
  }
}

/**
* uploadbom will orchestrate all the calls required to upload a bom file to
* Dependency Track
*/
exports.uploadbom = async(callback) => {
  const {bomFilepath, projectName, projectVersion, waitUntilBomProcessingComplete, failOnError} = config

  if (!fs.existsSync(bomFilepath)) {
      console.log('Bom file does not exists.');
      return;
  }

  const bomFileBuffer = fs.readFileSync(bomFilepath, '');

  if (!bomFileBuffer) {
     console.log('Bom could not be loaded.');
     return;
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

  if (!project) {
      console.log(`Project [${projectName} - ${projectVersion}] not found`);
      return;
  }

  projectService.deleteByUuid(project.uuid)
                .then(response => callback(response));
}
