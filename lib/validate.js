'use strict'

module.exports = function(options) {
    options.exclude = options.exclude || [];
    options.algorithm = options.algorithm || 'sha256';
    var algorithms = require('crypto').getHashes();
    if (algorithms.indexOf(options.algorithm) < 0) {
        return 'Invalid algorithm. Available: ' + algorithms.join(', ');
    } else if (!Array.isArray(options.include)) {
        return 'List of files to include is not an array.';
    } else if (!Array.isArray(options.exclude)) {
        return 'List of files to excludes is not an array.';
    } else if (options.include.length == 0) {
        return 'No files to include provided.';
    }
};