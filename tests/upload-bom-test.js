const assert = require('assert');
const scenarios = require('./mocks/scenarios');
const dependencyTrack = require('../index');
const {config} = require('../config');

describe('Upload Bill of materials (BOM)', () => {

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
    scenarios.uploadBomOK();

    // Act and Assert
    dependencyTrack.uploadbom(resp => {
        const {token} = resp;
        assert.equal("ABC-ABC-ABC-ABC-ABC", token);
    });
  });

  it('401 - Unauthorized', async() => {
    // Arrange
    scenarios.uploadBomUnauthorized();

    // Act and Assert
    await dependencyTrack.uploadbom().catch(e =>
      assert.equal(e.message, "Request failed with status code 401")
    );
  });

  it('404 - The project could not found', async() => {
    // Arrange
    scenarios.uploadBomNotFound();

    // Act and Act
    await dependencyTrack.uploadbom().catch(e =>
      assert.equal(e.message, "Request failed with status code 404")
    );
  });

  describe('Test misconfigured attributes', () => {
    it('Config.bomFilepath', async() => {
      // Arrange
      scenarios.uploadBomOK();
      config.bomFilepath = './tests/bom.xml';

      // Act and Act
      await dependencyTrack.uploadbom().catch(e =>
        assert.equal(e.message, 'Bom file not found.')
      );
    });

    it('Config.bomFilepath with path instead of file', async() => {
      // Arrange
      scenarios.uploadBomOK();
      config.bomFilepath = './tests';

      // Act and Assert
      await dependencyTrack.uploadbom().catch(e =>
        assert.equal(e.message, 'Bom could not be loaded.')
      );
    });

    it('Config.baseUrl', async() => {
      // Arrange
      scenarios.uploadBomOK();
      config.baseUrl = 'http://wrong-url.com.br';

      // Act and Assert
      await dependencyTrack.uploadbom().catch (e =>
        assert.equal(e.message, "getaddrinfo ENOTFOUND wrong-url.com.br wrong-url.com.br:80")
      );
    });
  });
});
