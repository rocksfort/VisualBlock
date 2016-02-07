/**
 * 
 */
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

	it('should delete initial \'0\' when typing the first number', function() {
		ctrl.digit('1');
		expect($scope.expression).toBe('1');
	});
	
	it('should NOT delete initial \'0\' when typing an operator first', function() {
		ctrl.operator('+');
		expect($scope.expression).toBe('0 +');
	});

	it('should type several numbers', function() {
		ctrl.digit('1');
		ctrl.digit('2');
		ctrl.digit('1');
		expect($scope.expression).toBe('121');
	});

	it('should insert gap before an operator', function() {
		ctrl.operator('+');
		expect($scope.expression).toBe('0 +');
	});

	it('should insert gap after an operator (before the next digit)', function() {
		ctrl.operator('+');
		ctrl.digit('1');
		expect($scope.expression).toBe('0 + 1');
	});
	
	it('should insert a dot after a number', function() {
		ctrl.dot();
		expect($scope.expression).toBe('0.');
	});
	
	it('should NOT insert a dot after a dot', function() {
		ctrl.dot();
		ctrl.dot();
		expect($scope.expression).toBe('0.');
	});

	it('should insert a \'0\' before dot if typed after an operator', function() {
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