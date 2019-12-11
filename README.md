# util.toolbox

> A set of utility functions used for build and testing across web projects.

[![build](https://github.com/jmquigley/util.toolbox/workflows/build/badge.svg)](https://github.com/jmquigley/util.toolbox/actions)
[![analysis](https://img.shields.io/badge/analysis-tslint-9cf.svg)](https://palantir.github.io/tslint/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![testing](https://img.shields.io/badge/testing-jest-blue.svg)](https://facebook.github.io/jest/)
[![NPM](https://img.shields.io/npm/v/util.toolbox.svg)](https://www.npmjs.com/package/util.toolbox)


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

- [closestNumber](docs/index.md#closestNumber)
- [getRandomInt](docs/index.md#getRandomInt)
- [getRandomIntInclusive](docs/index.md#getRandomIntInclusive)
- [getUUID](docs/index.md#getUUID)
- [nil](docs/index.md#nil)
- [nilEvent](docs/index.md#nilEvent)
- [objFindKeyByValue](docs/index.md#objFindKeyByValue)
- [objHasValue](docs/index.md#objHasValue)
- [roundUp](docs/index.md#roundUp)
- [sanitize](docs/index.md#sanitize)

It contains the following exposed variables:

- `isBrowser` -- true if the runtime environment is the browser, otherwise false
- `isNode` -- true if the runtime environement is NodeJS, otherwise false
