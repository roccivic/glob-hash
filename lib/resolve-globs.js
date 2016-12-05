'use strict'

var async = require('async');
var glob = require('glob');
var normalise = require('./normalise');
var q = require('q');

/**
 * Resolves an array of globs to
 * a sorted array of file paths.
 *
 * @param {Array} globs An array of globs.
 * @return {Promise} A promise to resolve the globs.
 */
module.exports = function(globs) {
    var deferred = q.defer();
    var funcs = globs.map(function(g) {
        return function(callback) {
            glob(g, function(error, files) {
                if (error) {
                    callback(error);
                } else {
                    callback(
                        null,
                        files.map(normalise)
                    );
                }
            });
        }
    });
    async.parallel(funcs, function(error, files) {
        if (error) {
            deferred.reject(error);
        } else {
            deferred.resolve(
                Array.prototype.concat.apply([], files)
            );
        }
    });
    return deferred.promise;
};