# util.toolbox [![Build Status](https://travis-ci.org/jmquigley/util.toolbox.svg?branch=master)](https://travis-ci.org/jmquigley/util.toolbox) [![tslint code style](https://img.shields.io/badge/code_style-TSlint-5ed9c7.svg)](https://palantir.github.io/tslint/) [![NPM](https://img.shields.io/npm/v/util.toolbox.svg)](https://www.npmjs.com/package/util.toolbox) [![Coverage Status](https://coveralls.io/repos/github/jmquigley/util.toolbox/badge.svg?branch=master)](https://coveralls.io/github/jmquigley/util.toolbox?branch=master)

> A set of functions used for build and testing across projects

## Installation

To install as a global package:
```
$ npm install --global util.toolbox
```

To install as an application dependency:
```
$ npm install --save util.toolbox
```

To build the app and run all tests:
```
$ npm run all
```


## Usage

The toolbox contains the following functions:

- [call](docs/index.md#call)
- [nil](docs/index.md#nil)
- [sanitize](docs/index.md#sanitize)

The toolbox contains the following exposed variables:

- `isWin` -- true if the operating system is windows, otherwise false.
- `isMac` -- true if the operating system is OSX, otherwise false.
- `isLinux` -- true if the operating system is Linux, otherwise false.