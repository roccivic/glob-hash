'use strict'

var resolveGlobs = require('./resolve-globs');
var hashFiles = require('./hash-files');
var validate = require('./validate');

module.exports = function computeHash(options){
    validate(options);
    var includes = resolveGlobs(options.include);
    var excludes = resolveGlobs(options.exclude);
    var files = includes.filter(function (item){
        return excludes.indexOf(item) === -1;
    });
    if (files.length == 0) {
        throw new Error('No files were matched using the provided globs.');
    }
    files.sort();
    return hashFiles(
        files,
        options.algorithm
    );
};