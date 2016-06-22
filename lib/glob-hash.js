'use strict'

var resolveGlobs = require('./resolve-globs');
var hashFiles = require('./hash-files');
var validate = require('./validate');
var q = require('q');

module.exports = function computeHash(options){
    var deferred = q.defer();
    try
    {
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
        deferred.resolve(
            hashFiles(files, options.algorithm)
        );
    } catch (error) {
        deferred.reject(error);
    }
    return deferred.promise;
};