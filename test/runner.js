'use strict'

var assert = require('assert');
var globHash = require('../');

var validTests = require('./spec/valid-e2e');

for (var i = 0; i < validTests.length; i++) {
    (function(test){
        globHash(test.options)
        .then(function(hash) {
            var foo = assert.equal(
                hash,
                test.result,
                test.name
            );
            console.log(
                'OK: %s',
                test.name
            );
        })
        .fail(function(error) {
            console.log(
                'ERROR in %s: %s',
                test.name,
                error
            );
        });
    }(validTests[i]));
}