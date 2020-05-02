[![Build Status](https://github.com/Engcpp/dependency-track-node-module/workflows/Node%20CI/badge.svg)](https://github.com/Engcpp/dependecy-track-node-module/actions?workflow=Node+CI)
[![License](https://img.shields.io/badge/license-Apache%202.0-brightgreen.svg)][License]
[![Latest](
https://img.shields.io/npm/v/@dependency-track/bom)](https://www.npmjs.com/package/@dependency-track/bom)


Depency Track Node.js Module
=========

**Dependency Track Node.js Module** makes integration with **OWASP Dependency Track** easier by enabling your pipeline automation to be 100% written in javascript.


Requirements
-------------------
Node.js v8.0.0 or higher

Usage
-------------------

#### Installing

```bash
npm install -g @dependecy-track/bom
```

#### Getting Help
```bash
$ dependency-track -h
Usage:  dependency-track [OPTIONS] [path]
Options:
  -h        - this help
  -u        - upload the bom
  -f        - findings, prints out some details of all of the current issues found in the scan
  -s        - score, Get the Risk Score for the current project
  -d        - delete, delete the current or any arbitrary project from the server
  -m        - metrics, Get and print all metrics from the server
  --version - print version number
```

#### Basic configuration

|Property              |Required|Default Value        |
|----------------------|--------|---------------------|
|dependencyTrackBaseUrl|true    |N/A                  |
|apiKey                |true    |N/A                  |
|projectName           |true    |N/A                  |
|projectVersion        |true    |N/A                  |
|failOnError           |false   |false                |  
|waitUntilBomProcessingComplete|false|false           |

#### Example
```bash
dependency-track -u bom.xml --apiKey ABCDEXYZ --projectName 'Internet Banking' --projectVersion 1.0
```

License
-------------------

Permission to modify and redistribute is granted under the terms of the Apache 2.0 license. See the [LICENSE] file for the full license.

[License]: https://github.com/Engcpp/dependency-track-node-module/blob/master/LICENSE
