# glob-hash
npm module to hash the contents of files matched by globs

[![MIT License Badge](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/roccivic/glob-hash/blob/master/LICENSE.txt)
[![Build Status](https://travis-ci.org/roccivic/glob-hash.svg?branch=master)](https://travis-ci.org/roccivic/glob-hash)
[![npm](https://img.shields.io/npm/v/glob-hash.svg)](https://www.npmjs.com/package/glob-hash)

# Via Command line

## Install
```sh
npm install -g glob-hash
```

## Use
Note: option ```-i/--include``` is mandatory

    Usage: glob-hash [options]

    Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -i, --include <glob>      Files to include. May be used multiple times.
    -e, --exclude <glob>      Files to exclude. May be used multiple times.
    -a, --algorithm <string>  Hashing algorithm to use. Defaults to "sha256".
    -f, --files               Show matched files and exit.

# Via API

## Install
```sh
npm install glob-hash --save
```

## Use
### Sample
```js
var globHash = require('glob-hash');

globHash(options)
.then(function(hash) {
    console.log(hash);
}, function(error) {
    console.log(error);
});
```

### Options
*Array* **include** - An array of [globs](https://www.npmjs.com/package/glob) used to match the files to hash. **Mandatory option**.

*Array* **exclude** - An array of [globs](https://www.npmjs.com/package/glob) to exclude from the search.

*String* **algorithm** - The hashing algorithms to use. Defaults to **"sha256"**, see [crypto.getHashes](https://nodejs.org/api/crypto.html#crypto_crypto_gethashes).

*Boolean* **files** - Returns an array of files matched by the globs, instead of returning the hash.

### More samples
```js
// Get hash
globHash({
    include: ['src/**/*.js', '**/*.json'],
    exclude: ['package.json'],
    algorithm: 'sha256' // This is the default
})
.then(
    function(result) {
        console.log(result);
    },
    function(error) {
        console.log(error);
    }
);
```

```js
// Get list of matched files
globHash({
    include: ['src/**/*.js', '**/*.json'],
    exclude: ['package.json'],
    files: true
})
.then(
    function(result) {
        console.log(result);
    },
    function(error) {
        console.log(error);
    }
);
```

# Test
```
npm test
```