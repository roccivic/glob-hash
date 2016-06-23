'use strict'

var async = require('async');
var glob = require('glob');
var q = require('q');

module.exports = function resolveGlobs(globs) {
    var deferred = q.defer();
    var funcs = globs.map(function(g) {
        return function(callback) {
            glob(g, function(error, files) {
                if (error) {
                    callback(error);
                } else {
                    callback(null, files);
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