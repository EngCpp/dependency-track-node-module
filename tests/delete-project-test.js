const assert = require('assert');
const scenarios = require('./mocks/scenarios');
const dependencyTrack = require('../index');
const {config} = require('../utils/Configurations');

describe('Delete project', () => {

  beforeEach(() => {
    config.apiKey = 'ABC';
    config.baseUrl = 'http://localhost';
    config.projectName = 'Dummy Project';
    config.projectVersion = '1.0';  
    config.bomFilepath = './tests/resources/bom.xml';
    scenarios.resetMocks();
  });

  it('Happy path', () => {
    // Arrange
    scenarios.deleteProjectOK();

    // Act
    dependencyTrack.deleteProject((response) => {
        // Assert
        assert.equal("", response);
    });
  });

  it('[] - Project not found', async() => {
    // Arrange
    scenarios.deleteProjectWithEmptyListResponse();

    try {
      // Act
      await dependencyTrack.deleteProject(() => {});
      assert.fail('Error expected');
    } catch(e) {
      // Assert
      assert.equal(e.message, `Project [${config.projectName} - ${config.projectVersion}] not found`);
    }
  });

  it('1.0 - Expected version of the project not found', async() => {
    scenarios.deleteProjectWithWrongVersionResponse();

    try {
      // Act
      await dependencyTrack.deleteProject(() => {});
      assert.fail('Error expected');
    } catch(e) {
      // Assert
      assert.equal(e.message, `Project [${config.projectName} - ${config.projectVersion}] not found`);
    }
  });

  it('404 - Project not found', async() => {
    scenarios.deleteProjectWithProjectUuidNotFoundResponse();

    try {
      // Act
      await dependencyTrack.deleteProject(() => {});
      assert.fail('Error expected');
    } catch(e) {
      // Assert
      assert.equal(e.message, "Request failed with status code 404");
    }
  });

  it('401 - Unauthorized', async() => {
    scenarios.deleteProjectUnauthorized();

    try {
      // Act
      await dependencyTrack.deleteProject(() => {});
      assert.fail('Error expected');
    } catch(e) {
      // Assert
      assert.equal(e.message, "Request failed with status code 401");
    }
  });
});
