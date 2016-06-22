'use strict'

module.exports = function (options){
    var error;
    options.algorithm = options.algorithm || 'sha256';
    var algorithms = require('crypto').getHashes();
    if (algorithms.indexOf(options.algorithm) < 0) {
        throw new Error('Invalid algorithm. Available: ' + algorithms.join(', '));
    } else if (!Array.isArray(options.include)) {
        throw new Error('List of files to include is not an array.');
    } else if (!Array.isArray(options.exclude)) {
        throw new Error('List of files to excludes is not an array.');
    } else if (options.include.length == 0) {
        throw new Error('No files to include provided.');
    }
};