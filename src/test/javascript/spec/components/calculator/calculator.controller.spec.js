/**
 *
 */
(function() {
    'use strict';
    describe('CalculatorController', function calculatorControllerSpecs() {
        var ctrl, $scope;

        beforeEach(module('visualBlockApp'));
        beforeEach(inject(function loadController($controller, $rootScope) {
            $scope = $rootScope.$new();
            ctrl = $controller('CalculatorController', {$rootScope: $rootScope, $scope: $scope});
        }));

        it('should initialze expresson as \'0\'', function() {
            expect($scope.expression).toBe('0');
        });

        describe('digit', function backSpaceSpecs() {
            it('should delete initial \'0\' when typing the first digit', function() {
                ctrl.digit('1');
                expect($scope.expression).toBe('1');
            });

            it('should type several digits', function() {
                ctrl.digit('1');
                ctrl.digit('2');
                ctrl.digit('1');
                expect($scope.expression).toBe('121');
            });

            it('should insert gap before a digit following an operator', function() {
                ctrl.operator('+');
                ctrl.digit('1');
                expect($scope.expression).toBe('0 + 1');
            });
        });

        describe('operator', function backSpaceSpecs() {
            it('should NOT delete initial \'0\' when typing an operator first', function() {
                ctrl.operator('+');
                expect($scope.expression).toBe('0 +');
            });

            it('should insert gap before an operator', function() {
                ctrl.operator('+');
                expect($scope.expression).toBe('0 +');
            });

            it('should replace operator when typing another operator', function() {
                ctrl.operator('+');
                expect($scope.expression).toBe('0 +');
                ctrl.operator('-');
                expect($scope.expression).toBe('0 -');
                ctrl.operator('*');
                expect($scope.expression).toBe('0 *');
                ctrl.operator('/');
                expect($scope.expression).toBe('0 /');
            });
        });

        describe('dot', function backSpaceSpecs() {
            it('should insert a dot after a number', function() {
                ctrl.dot();
                expect($scope.expression).toBe('0.');
            });

            it('should NOT insert a dot after a dot', function() {
                ctrl.dot();
                ctrl.dot();
                expect($scope.expression).toBe('0.');
            });

            it('should NOT insert a dot if the number already has one', function() {
                ctrl.dot();
                ctrl.digit('1');
                ctrl.dot();
                expect($scope.expression).toBe('0.1');
            });

            it('should insert a \'0\' before dot if typed after an operator', function() {
                ctrl.operator('+');
                ctrl.dot();
                expect($scope.expression).toBe('0 + 0.');
            });

            it('should insert a \'0\' before dot if typed into emptz display', function() {
                ctrl.backSpace();
                expect($scope.expression).toBe('');
                ctrl.dot();
                expect($scope.expression).toBe('0.');
            });

            it('should insert dots into separate numbers', function() {
                ctrl.digit('1');
                ctrl.digit('1');
                ctrl.dot();
                ctrl.digit('1');
                ctrl.operator('+');
                ctrl.digit('1');
                ctrl.dot();
                expect($scope.expression).toBe('11.1 + 1.');
            });
        });

        describe('backSpace', function backSpaceSpecs() {
            it('should backSpace a number', function() {
                ctrl.digit('1');
                ctrl.digit('1');
                ctrl.digit('1');
                ctrl.backSpace();
                expect($scope.expression).toBe('11');
            });

            it('should backSpace a single number', function() {
                expect($scope.expression).toBe('0');
                ctrl.backSpace();
                expect($scope.expression).toBe('');
            });

            it('should backSpace a dot', function() {
                ctrl.dot();
                expect($scope.expression).toBe('0.');
                ctrl.backSpace();
                expect($scope.expression).toBe('0');
            });

            it('should backSpace an operator', function() {
                ctrl.operator('+');
                expect($scope.expression).toBe('0 +');
                ctrl.backSpace();
                expect($scope.expression).toBe('0');
            });

            it('should backSpace a number and the gap when the number follows an operator', function() {
                ctrl.operator('+');
                ctrl.digit('1');
                expect($scope.expression).toBe('0 + 1');
                ctrl.backSpace();
                expect($scope.expression).toBe('0 +');
            });
        });
    });
})();
