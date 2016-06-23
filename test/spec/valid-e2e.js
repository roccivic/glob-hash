'use strict'

var path = require('path');

module.exports = [{
    name: 'Should hash text files',
    result: '88ecde925da3c6f8ec3d140683da9d2a422f26c1ae1d9212da1e5a53416dcc88',
    options: {
        include: ['**/*.tst']
    }
}, {
    name: 'Should find text files',
    result: [
        path.resolve('test/samples/bar.tst'),
        path.resolve('test/samples/foo.tst')
    ],
    options: {
        include: ['**/*.tst'],
        files: true
    }
}, {
    name: 'Should exclude bar.tst from hash',
    result: '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    options: {
        include: ['**/*.tst'],
        exclude: ['**/bar.tst']
    }
}, {
    name: 'Should exclude bar.tst from list of files',
    result: [
        path.resolve('test/samples/foo.tst')
    ],
    options: {
        include: ['**/*.tst'],
        exclude: ['**/bar.tst'],
        files: true
    }
}, {
    name: 'Should use MD5 for hashing',
    result: '96948aad3fcae80c08a35c9b5958cd89',
    options: {
        include: ['**/*.tst'],
        algorithm: 'md5'
    }
}];