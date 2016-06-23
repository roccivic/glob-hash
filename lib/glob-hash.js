'use strict'

var resolveGlobs = require('./resolve-globs');
var hashFiles = require('./hash-files');
var validate = require('./validate');
var q = require('q');

module.exports = function computeHash(options){
    var deferred = q.defer();
    var error = validate(options);
    if (error) {
        deferred.reject(error);
    } else {
        resolveGlobs(options.include)
        .then(function(includes) {
            options.include = includes;
            return resolveGlobs(options.exclude);
        })
        .then(function(excludes) {
            var files = options.include.filter(function(item) {
                return excludes.indexOf(item) === -1;
            });
            if (files.length === 0) {
                deferred.reject(
                    'No files were matched using the provided globs.'
                );
            } else {
                files.sort();
                deferred.resolve(
                    hashFiles(files, options.algorithm)
                );
            }
        })
        .fail(function(error) {
            deferred.reject(error);
        });
    }
    return deferred.promise;
};