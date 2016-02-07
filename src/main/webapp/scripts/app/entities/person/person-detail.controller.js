'use strict';

angular.module('visualBlockApp')
    .controller('PersonDetailController', function ($scope, $rootScope, $stateParams, entity, Person) {
        $scope.person = entity;
        $scope.load = function (id) {
            Person.get({id: id}, function(result) {
                $scope.person = result;
            });
        };
        var unsubscribe = $rootScope.$on('visualBlockApp:personUpdate', function(event, result) {
            $scope.person = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
