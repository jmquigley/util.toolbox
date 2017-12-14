# util.toolbox [![Build Status](https://travis-ci.org/jmquigley/util.toolbox.svg?branch=master)](https://travis-ci.org/jmquigley/util.toolbox) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![Test Runner](https://img.shields.io/badge/testing-ava-blue.svg)](https://github.com/avajs/ava) [![NPM](https://img.shields.io/npm/v/util.toolbox.svg)](https://www.npmjs.com/package/util.toolbox) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.toolbox/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.toolbox?branch=master)

> A set of utility functions used for build and testing across projects.

## Installation

This module uses [yarn](https://yarnpkg.com/en/) to manage dependencies and run scripts for development.

To install as a development application dependency:
```
$ yarn install --dev util.toolbox
```

To build the app and run all tests:
```
$ yarn run all
```

## Usage

The toolbox contains the following functions:

- [call](docs/index.md#call)
- [callSync](docs/index.md#callSync)
- [closestNumber](docs/index.md#closestNumber)
- [getDirectories](docs/index.md#getDirectories)
- [getRandomInt](docs/index.md#getRandomInt)
- [getRandomIntInclusive](docs/index.md#getRandomIntInclusive)
- [getUUID](docs/index.md#getUUID)
- [nil](docs/index.md#nil)
- [nilEvent](docs/index.md#nilEvent)
- [sanitize](docs/index.md#sanitize)

It contains the following exposed variables:

- `isDarwin` -- true if the operating system is OSX, otherwise false (same as `isMac`)
- `isLinux` -- true if the operating system is Linux, otherwise false.
- `isMac` -- true if the operating system is OSX, otherwise false.
- `isWin` -- true if the operating system is windows, otherwise false.
- `encoding` -- default encoding string of 'utf-8'
- `failure` -- the number 127 for a failed operation
- `success` -- the number 0 for a successful operation
