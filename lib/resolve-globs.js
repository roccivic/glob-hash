'use strict'

var glob = require('glob');

module.exports = function resolveGlobs(globs){
    return globs.reduce(function(memo, g) {
        return memo.concat(glob.sync(g));
    }, []);
};