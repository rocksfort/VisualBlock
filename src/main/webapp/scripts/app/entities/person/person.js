'use strict';

angular.module('visualBlockApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('person', {
                parent: 'entity',
                url: '/persons',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Persons'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/persons.html',
                        controller: 'PersonController'
                    }
                },
                resolve: {
                }
            })
            .state('person.detail', {
                parent: 'entity',
                url: '/person/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Person'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/person/person-detail.html',
                        controller: 'PersonDetailController'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Person', function($stateParams, Person) {
                        return Person.get({id : $stateParams.id});
                    }]
                }
            })
            .state('person.new', {
                parent: 'person',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/person/person-dialog.html',
                        controller: 'PersonDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    name: null,
                                    gender: false,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('person', null, { reload: true });
                    }, function() {
                        $state.go('person');
                    })
                }]
            })
            .state('person.edit', {
                parent: 'person',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/person/person-dialog.html',
                        controller: 'PersonDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Person', function(Person) {
                                return Person.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('person', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
