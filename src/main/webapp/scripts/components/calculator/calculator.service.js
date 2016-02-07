'use strict';

angular.module('visualBlockApp')
    .factory('Calculator', function() {
        return {
        	digit: digit,
        	dot: dot,
        	operator: operator,
        	backSpace: backSpace,
        	submit: submit
        };
        
        function digit(expression, digit) {
			if (expression == '0') {
				expression = digit;
			} else {
				if (isOperator(getLastCharacter(expression))) {
					expression = expression + ' ';
					console.log('add space');
				}
				expression = expression + digit;
			}
			
			return expression;
		}
        
        function dot(expression) {
			if (expression == '' || isOperator(getLastCharacter(expression))) {
				digit('0');
			}
			var tokens = expression.split(' ');
			
			if (tokens[tokens.length-1].indexOf('.') == -1) {
				expression = expression + '.';
			}
			
			return expression;
		}
        
        function operator(expression, operator) {
			if (!isDigit(getLastCharacter(expression))) {
				backSpace();
			}
			expression = expression + ' ' + operator;
			
			return expression;
		}
        
        function backSpace(expression) {
			var backSpaceLength = 1;
			if (isOperator(getLastCharacter(expression))) {
				backSpaceLength++;
				console.log('++');
			}
			expression = expression.substring(0, expression.length - backSpaceLength);
			console.log(expression);
			if (getLastCharacter() == ' ') {
				return backSpace(expression);
			}
			
			return expression;
		}
		
        function submit(expression) {
        	console.log('SUBMIT');
        }
        
        /* private */
        
        function isOperator(character) {
			var operators = ['+', '-', '*', '/', '>', '<'];
			console.log(character, 'is operator: ', operators.indexOf(character) > -1);
			return operators.indexOf(character) > -1;
		}
		
		function isDigit(character) {
			var digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
			console.log(character, 'is operator: ', digits.indexOf(character) > -1);
			return digits.indexOf(character) > -1;
		}
		
		function getLastCharacter(expression) {
			if (!expression) {
				return;
			}
			console.log('last char: ', expression.charAt(expression.length - 1));
			return expression.charAt(expression.length - 1);
		}
    });
