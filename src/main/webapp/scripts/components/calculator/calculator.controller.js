/**
 * 
 */
(function() {
	'use strict';
	
	angular.module('visualBlockApp')
		.controller('CalculatorController', calculatorController);
	
	calculatorController.$inject = ['$scope', 'Calculator'];
	
	function calculatorController($scope, Calculator) {
		
		$scope.expression = '0';
		
		var vm = this;
		vm.backSpace = backSpace;
		vm.operator = operator;
		vm.digit = digit;
		vm.dot = dot;
		vm.submit = submit;
		
		function backSpace() {
			$scope.expression = Calculator.backSpace($scope.expression);
		}
		
		function dot() {
			$scope.expression = Calculator.dot($scope.expression);
		}
		
		function operator(operator) {
			$scope.expression = Calculator.operator($scope.expression, operator);
		}
		
		function digit(digit) {
			$scope.expression = Calculator.digit($scope.expression, digit);
		}
		
		function submit(expression) {
			$scope.expression = Calculator.submit($scope.expression, digit);
		}	
	}
})();

function Addition() {
	this.operaterate = function() {
		return this.value1 + this.operand2;
	};
};

















