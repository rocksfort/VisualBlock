/**
 * 
 */
angular.module('visualBlockApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('calculator', {
                parent: 'site',
                url: '/calculator',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Calculator'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/components/calculator/calculator.html',
                        controller: 'PersonController'
                    }
                },
                resolve: {
                }
            })
    })
;