'use strict';

angular.module('visualBlockApp')
    .factory('Person', function ($resource, DateUtils) {
        return $resource('api/persons/:id', {}, {
            query: {
            	method: 'GET',
            	isArray: true
            },
            queryGirls: {
            	method: 'GET',
            	isArray: true,
            	url: 'api/persons/girls'
            },
            get: {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            update: {
            	method:'PUT'
            }
        });
    });
