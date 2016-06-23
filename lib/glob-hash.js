'use strict'

var resolveGlobs = require('./resolve-globs');
var hashFiles = require('./hash-files');
var validate = require('./validate');
var q = require('q');

/**
 * Entry point into the module.
 * Parses and validates the options,
 * then performs the desired operation.
 *
 * @param {Object} options The desired options.
 * @return {Promise} A promise to perform the desired operation.
 */
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
                if (options.files) {
                    deferred.resolve(files);
                } else {
                    deferred.resolve(
                        hashFiles(files, options.algorithm)
                    );
                }
            }
        })
        .fail(function(error) {
            deferred.reject(error);
        });
    }
    return deferred.promise;
};