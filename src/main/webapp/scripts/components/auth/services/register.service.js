'use strict';

angular.module('visualBlockApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


