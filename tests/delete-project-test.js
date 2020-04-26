const assert = require('assert');
const scenarios = require('./mocks/scenarios');
const dependencyTrack = require('../index');
const {config} = require('../config');

describe('Delete project', () => {

  beforeEach(() => {
    config.apiKey = 'ABC';
    config.baseUrl = 'http://localhost';
    config.projectName = 'Dummy Project';
    config.projectVersion = '1.0';
    config.bomFilepath = './tests/resources/bom.xml';
    scenarios.resetMocks();
  });

  it('Happy path', async() => {
    // Arrange
    scenarios.deleteProjectOK();

    // Act and Assert
    const response = await dependencyTrack.deleteProject();
    assert.equal("", response);
  });

  it('[] - Project not found', async() => {
    // Arrange
    scenarios.deleteProjectWithEmptyListResponse();

    // Act and Assert
    await dependencyTrack.deleteProject().catch(e =>
      assert.equal(e.message, `Project [${config.projectName} - ${config.projectVersion}] not found`)
    );
  });

  it('1.0 - Expected version of the project not found', async() => {
    scenarios.deleteProjectWithWrongVersionResponse();

    // Act
    await dependencyTrack.deleteProject().catch(e =>
      assert.equal(e.message, `Project [${config.projectName} - ${config.projectVersion}] not found`)
    );
  });

  it('404 - Project not found', async() => {
    scenarios.deleteProjectWithProjectUuidNotFoundResponse();

    // Act and Assert
    await dependencyTrack.deleteProject().catch(e =>
      assert.equal(e.message, "Request failed with status code 404")
    );
  });

  it('401 - Unauthorized', async() => {
    scenarios.deleteProjectUnauthorized();

    // Act and Assert
    await dependencyTrack.deleteProject().catch(e =>
      assert.equal(e.message, "Request failed with status code 401")
    );
  });
});
