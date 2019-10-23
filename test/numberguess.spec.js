var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

var NumberGuess = require('../numberguess.js');

describe("Number Guess", function () {
	describe("higher_or_lower(guess, number_to_guess)", function() {
		it("returns 'higher' if number_to_guess is higher than guess", function () {
			expect(NumberGuess.higher_or_lower(10, 30)).to.equal("higher");
			expect(NumberGuess.higher_or_lower(10, 11)).to.equal("higher");
			expect(NumberGuess.higher_or_lower(0, 1)).to.equal("higher");
		}) 
		it("returns 'lower' if number_to_guess is lower than guess", function () {
			expect(NumberGuess.higher_or_lower(30, 10)).to.equal("lower");
			expect(NumberGuess.higher_or_lower(11, 10)).to.equal("lower");
			expect(NumberGuess.higher_or_lower(1, 0)).to.equal("lower");
		})
		it("returns 'winner' if number_to_guess is equal to guess", function () {
			expect(NumberGuess.higher_or_lower(10, 10)).to.equal("winner");
			expect(NumberGuess.higher_or_lower(0, 0)).to.equal("winner");
			expect(NumberGuess.higher_or_lower(1, 1)).to.equal("winner");
		})
	});
});
