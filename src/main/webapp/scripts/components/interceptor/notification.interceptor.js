 'use strict';

angular.module('visualBlockApp')
    .factory('notificationInterceptor', function ($q, AlertService) {
        return {
            response: function(response) {
                var alertKey = response.headers('X-visualBlockApp-alert');
                if (angular.isString(alertKey)) {
                    AlertService.success(alertKey, { param : response.headers('X-visualBlockApp-params')});
                }
                return response;
            }
        };
    });
