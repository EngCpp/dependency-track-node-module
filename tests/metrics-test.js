const assert = require('assert');
const scenarios = require('./mocks/scenarios');
const dependencyTrack = require('../index');
const {config} = require('../config');

describe('Metrics', () => {
  beforeEach(() => {
    config.apiKey = 'ABC';
    config.baseUrl = 'http://localhost';
    config.projectName = 'Dummy Project';
    config.projectVersion = '1.0';
    config.bomFilepath = './tests/resources/bom.xml';
    config.findingsThreshold = {
      critical: -1,
      high: -1,
      medium: -1,
      low: -1
    }
    scenarios.resetMocks();
  });

  it('Happy path', () => {
    // Arrange
    scenarios.metricsWithoutVulnerabilities();

    // Act
    dependencyTrack.metrics(response => {
      const {critical, high, medium, low} = response;

      assert.equal(critical, 0);
      assert.equal(high, 0);
      assert.equal(medium, 0);
      assert.equal(low, 0);
    });
  });

  it('given 100 critical vulnerabilities expect exception', async() => {
    // Arrange
    config.findingsThreshold.critical = 100;
    scenarios.metricsWithVulnerabilities();

    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "100 critical vulnerabilities found")
    );
  });

  it('given 80 high vulnerabilities expect exception', async() => {
    // Arrange
    config.findingsThreshold.high = 80;
    scenarios.metricsWithVulnerabilities();

    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "80 high vulnerabilities found")
    );
  });

  it('given 60 medium vulnerabilities expect exception', async() => {
    // Arrange
    config.findingsThreshold.medium = 60;
    scenarios.metricsWithVulnerabilities();

    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "60 medium vulnerabilities found")
    );
  });

  it('given 40 low vulnerabilities expect exception', async() => {
    // Arrange
    config.findingsThreshold.low = 40;
    scenarios.metricsWithVulnerabilities();

    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "40 low vulnerabilities found")
    );
  });

  it('Happy path with vulnerabilities', () => {
    // Arrange
    scenarios.metricsWithVulnerabilities();

    // Act
    dependencyTrack.metrics(response => {
      const {critical, high, medium, low} = response;

      assert.equal(critical, 100);
      assert.equal(high, 80);
      assert.equal(medium, 60);
      assert.equal(low, 40);
    });
  });

  it('given vulnerabilities havent reach the threshold expect to continue', async() => {
    // Arrange
    scenarios.metricsWithVulnerabilities();
    config.findingsThreshold.critical = 101;
    config.findingsThreshold.high = 81;
    config.findingsThreshold.medium = 61;
    config.findingsThreshold.low = 41;

    // Act
    await dependencyTrack.metrics(response => {
      const {critical, high, medium, low} = response;
    // Assert
      assert.equal(critical, 100);
      assert.equal(high, 80);
      assert.equal(medium, 60);
      assert.equal(low, 40);
    });

  });

  it('404 - Project not found', async() => {
    scenarios.metricsNotFound();
    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "Request failed with status code 404")
    );
  });

  it('401 - Unauthorized', async() => {
    scenarios.metricsUnauthorized();
    // Act and Assert
    await dependencyTrack.metrics().catch(e =>
      assert.equal(e.message, "Request failed with status code 401")
    );
  });

});
