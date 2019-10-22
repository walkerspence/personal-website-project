var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

var TicTacToe = require('../tictactoe.js');

//TODO DELETE
//var functions = require('../solutions/functions1_solutions.js');

describe('Tic Tac Toe', function() {
	before(function () {
		var test_x_hori1 = new TicTacToe.Board();
		var test_x_hori2 = new TicTacToe.Board();
		var test_x_hori3 = new TicTacToe.Board();
		var test_x_vert1 = new TicTacToe.Board();
		var test_x_vert2 = new TicTacToe.Board();
		var test_x_vert3 = new TicTacToe.Board();
		var test_x_diag_up = new TicTacToe.Board();
		var test_x_diag_down = new TicTacToe.Board();

		var test_o_hori1 = new TicTacToe.Board();
		var test_o_hori2 = new TicTacToe.Board();
		var test_o_hori3 = new TicTacToe.Board();
		var test_o_vert1 = new TicTacToe.Board();
		var test_o_vert2 = new TicTacToe.Board();
		var test_o_vert3 = new TicTacToe.Board();
		var test_o_diag_up = new TicTacToe.Board();
		var test_o_diag_down = new TicTacToe.Board();

		var test_empty = new TicTacToe.Board();
		var test_full = new TicTacToe.Board();
		var test_some = new TicTacToe.Board();

		test_x_hori1.board[0] = ["x", "x", "x"]
		test_x_hori2.board[1] = ["x", "x", "x"]
		test_x_hori3.board[2] = ["x", "x", "x"]

		test_o_hori1.board[0] = ["o", "o", "o"]
		test_o_hori2.board[1] = ["o", "o", "o"]
		test_o_hori3.board[2] = ["o", "o", "o"]

		test_o_vert1.assign_column("o", 0);
		test_o_vert2.assign_column("o", 1);
		test_o_vert3.assign_column("o", 2);

		test_x_vert1.assign_column("x", 0);
		test_x_vert2.assign_column("x", 1);
		test_x_vert3.assign_column("x", 2);

		test_x_diag_up.assign_up_diag("x")
		test_x_diag_down.assign_down_diag("x")

		test_o_diag_up.assign_up_diag("o")
		test_o_diag_down.assign_down_diag("o")

		test_full.board = [
							["x", "o", "x"],
							["o", "x", "x"],
							["o", "x", "o"]
						  ] 
		test_some.board = [
							["x", " ", "x"],
							["o", "x", "o"],
						 	[" ", "x", " "]
						  ]


	});

	describe('opposite_symbol(symbol)', function() {
		it('returns x if symbol == o', function() {
			expect(TicTacToe.opposite_symbol("o")).to.equal("x");
		});

		it('returns o if symbol == x', function() {
			expect(TicTacToe.opposite_symbol("x")).to.equal("o");
		});
	});

	describe('three_horizontally(board, last_y, symbol)', function() {
		it('returns true if last move made three in a row horizontally');
		it('returns false if no horizontal threes');
		it('returns false if three appeared horizontally before the last move')
	});

	describe('three_vertically(board, last_x, symbol)', function() {
		it('returns true if last move made three in a row vertically');
		it('returns false if no vertical threes');
		it('returns false if three appeared vertically before the last move')
	});

	describe('three_diagonal_up(board, symbol)', function() {
		it('returns true if last move made three in a row diagonally up');
		it('returns false if no diagonally up threes');
		it('returns false if three appeared diagonally up before the last move')
    });

    describe('three_diagonal_down(board, symbol)', function() {
		it('returns true if last move made three in a row diagonally down');
		it('returns false if no diagonally down threes');
		it('returns false if three appeared diagonally down before the last move')
    });

    describe('game_over', function() {
		it('returns "X wins" if last move made x win');
		it('returns "O wins" if last move made o win');
		it('returns "Draw" if no moves are left');
		it('returns false when no end game state is reached');
    });
});
