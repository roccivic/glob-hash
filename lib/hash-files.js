'use strict'

var fs = require('fs');
var crypto = require('crypto');

module.exports = function (files, algorithm){
    var hash = crypto.createHash(algorithm);
    for (var i = 0; i < files.length; i++) {
        hash.update(fs.readFileSync(files[i]));
    }
    return hash.digest("hex");
};