# Reshape Parser

[![npm](https://img.shields.io/npm/v/reshape-parser.svg?style=flat-square)](https://npmjs.com/package/reshape-parser)
[![tests](https://img.shields.io/travis/reshape/parser.svg?style=flat-square)](https://travis-ci.org/reshape/parser?branch=master)
[![dependencies](https://img.shields.io/david/reshape/parser.svg?style=flat-square)](https://david-dm.org/reshape/parser)
[![coverage](https://img.shields.io/coveralls/reshape/parser.svg?style=flat-square)](https://coveralls.io/r/reshape/parser?branch=master)

An html parser for reshape based on [parse5](https://github.com/inikulin/parse5), featuring source location info and more robust node types.

> **Note:** This project is in early development, and versioning is a little different. [Read this](http://markup.im/#q4_cRZ1Q) for more details.

### Installation

`npm install reshape-parser -S`

> **Note:** This project is compatible with node v6+ only

### Usage

```js
const parser = require('reshape-parser')
const html = '<p>hello world</p>'

parser(html) // returns a reshape AST
```

#### Options

No options are required, all are optional.

| Name | Description | Default |
| ---- | ----------- | ------- |
| **filename** | Attach a filename to the `location` info in each node | |

### The Reshape AST

See the [Reshape AST documentation](https://github.com/reshape/reshape#reshape-ast) for more information on the format.

### License & Contributing

- Details on the license [can be found here](LICENSE.md)
- Details on running tests and contributing [can be found here](contributing.md)
