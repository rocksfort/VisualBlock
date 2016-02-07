/**
 *
 */
angular.module('visualBlockApp').directive('calculator', calculatorDirective);

function calculatorDirective() {
    return {
        templateUrl: 'scripts/components/calculator/calculator.template.html',
        controller: 'CalculatorController',
        controllerAs: 'vm'
    };
}
