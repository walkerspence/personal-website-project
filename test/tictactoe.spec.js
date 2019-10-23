var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');

var TicTacToe = require('../tictactoe.js');

describe('Tic Tac Toe', function() {
	var test_x_hori1;
	var test_x_hori2;
	var test_x_hori3;
	var test_x_vert1;
	var test_x_vert2;
	var test_x_vert3;
	var test_x_diag_up;
	var test_x_diag_down;

	var test_o_hori1;
	var test_o_hori2;
	var test_o_hori3;
	var test_o_vert1;
	var test_o_vert2;
	var test_o_vert3;
	var test_o_diag_up;
	var test_o_diag_down;

	var test_empty;
	var test_full;
	var test_some;

	before(function () {
		test_x_hori1 = new TicTacToe.Board();
		test_x_hori2 = new TicTacToe.Board();
		test_x_hori3 = new TicTacToe.Board();
		test_x_vert1 = new TicTacToe.Board();
		test_x_vert2 = new TicTacToe.Board();
		test_x_vert3 = new TicTacToe.Board();
		test_x_diag_up = new TicTacToe.Board();
		test_x_diag_down = new TicTacToe.Board();

		test_o_hori1 = new TicTacToe.Board();
		test_o_hori2 = new TicTacToe.Board();
		test_o_hori3 = new TicTacToe.Board();
		test_o_vert1 = new TicTacToe.Board();
		test_o_vert2 = new TicTacToe.Board();
		test_o_vert3 = new TicTacToe.Board();
		test_o_diag_up = new TicTacToe.Board();
		test_o_diag_down = new TicTacToe.Board();

		test_empty = new TicTacToe.Board();
		test_full = new TicTacToe.Board();
		test_some = new TicTacToe.Board();

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
		it('returns true if last move made three in a row horizontally', function () {
			expect(TicTacToe.three_horizontally(test_x_hori1, 0, "x")).to.be.true;
			expect(TicTacToe.three_horizontally(test_x_hori2, 1, "x")).to.be.true;
			expect(TicTacToe.three_horizontally(test_x_hori3, 2, "x")).to.be.true;

			expect(TicTacToe.three_horizontally(test_o_hori1, 0, "o")).to.be.true;
			expect(TicTacToe.three_horizontally(test_o_hori2, 1, "o")).to.be.true;
			expect(TicTacToe.three_horizontally(test_o_hori3, 2, "o")).to.be.true;
		});
		it('returns false if no horizontal threes of correct symbol', function() {
			expect(TicTacToe.three_horizontally(test_x_hori1, 0, "o")).to.be.false;
			expect(TicTacToe.three_horizontally(test_full, 0, "o")).to.be.false;
			expect(TicTacToe.three_horizontally(test_empty, 0, "o")).to.be.false;
			expect(TicTacToe.three_horizontally(test_full, 0, "x")).to.be.false;
			expect(TicTacToe.three_horizontally(test_empty, 0, "x")).to.be.false;
		});
		it('returns false if three appeared horizontally before the last move', function() {
			expect(TicTacToe.three_horizontally(test_x_hori1, 1, "x")).to.be.false;
			expect(TicTacToe.three_horizontally(test_x_hori2, 2, "x")).to.be.false;
			expect(TicTacToe.three_horizontally(test_x_hori3, 0, "x")).to.be.false;
		});
	});

	describe('three_vertically(board, last_x, symbol)', function() {
		it('returns true if last move made three in a row vertically', function () {
			expect(TicTacToe.three_vertically(test_x_vert1, 0, "x")).to.be.true;
			expect(TicTacToe.three_vertically(test_x_vert2, 1, "x")).to.be.true;
			expect(TicTacToe.three_vertically(test_x_vert3, 2, "x")).to.be.true;


			expect(TicTacToe.three_vertically(test_o_vert1, 0, "o")).to.be.true;
			expect(TicTacToe.three_vertically(test_o_vert2, 1, "o")).to.be.true;
			expect(TicTacToe.three_vertically(test_o_vert3, 2, "o")).to.be.true;
		});
		it('returns false if no vertical threes of correct symbol', function() {
			expect(TicTacToe.three_vertically(test_x_vert1, 0, "o")).to.be.false;
			expect(TicTacToe.three_vertically(test_full, 0, "o")).to.be.false;
			expect(TicTacToe.three_vertically(test_empty, 0, "o")).to.be.false;
			expect(TicTacToe.three_vertically(test_full, 0, "x")).to.be.false;
			expect(TicTacToe.three_vertically(test_empty, 0, "x")).to.be.false;
		});

		it('returns false if three appeared vertically before the last move', function () {
			expect(TicTacToe.three_horizontally(test_x_vert1, 1, "x")).to.be.false;
			expect(TicTacToe.three_horizontally(test_x_vert2, 2, "x")).to.be.false;
			expect(TicTacToe.three_horizontally(test_x_vert3, 0, "x")).to.be.false;
		})
	});

	describe('three_diagonally_up(board, symbol)', function() {
		it('returns true if last move made three in a row diagonally up', function () {
			expect(TicTacToe.three_diagonally_up(test_x_diag_up, "x")).to.be.true;
			expect(TicTacToe.three_diagonally_up(test_o_diag_up, "o")).to.be.true;
		});
		it('returns false if no diagonally up threes of correct symbol', function () {
			expect(TicTacToe.three_diagonally_up(test_x_diag_up, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_up(test_full, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_up(test_empty, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_up(test_full, "x")).to.be.false;
			expect(TicTacToe.three_diagonally_up(test_empty, "x")).to.be.false;
		});
    });

    describe('three_diagonally_down(board, symbol)', function() {
		it('returns true if last move made three in a row diagonally down', function () {
			expect(TicTacToe.three_diagonally_down(test_x_diag_down, "x")).to.be.true;
			expect(TicTacToe.three_diagonally_down(test_o_diag_down, "o")).to.be.true;
		});
		it('returns false if no diagonally down threes of correct symbol', function () {
			expect(TicTacToe.three_diagonally_down(test_x_diag_down, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_down(test_full, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_down(test_empty, "o")).to.be.false;
			expect(TicTacToe.three_diagonally_down(test_full, "x")).to.be.false;
			expect(TicTacToe.three_diagonally_down(test_empty, "x")).to.be.false;
		});
    });

    describe('game_over(board, available_moves, last_x, last_y, last_symbol)', function() {
		it('calls three_diagonally_up when last_x + last_y == 2', function () {
			expect(TicTacToe.game_over(test_x_diag_up, [[0, 0]], 0, 0, "x")).to.be.false;
			expect(TicTacToe.game_over(test_o_diag_up, [[0, 0]], 2, 2, "o")).to.be.false;

			expect(TicTacToe.game_over(test_x_diag_up, [[0, 0]], 1, 1, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_o_diag_up, [[0, 0]], 0, 2, "o")).to.equal("O wins!");
		})
		it('calls three_diagonally_up when last_x == last_y', function () {
			expect(TicTacToe.game_over(test_x_diag_down, [[0, 0]], 0, 0, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_o_diag_down, [[0, 0]], 2, 2, "o")).to.equal("O wins!");

			expect(TicTacToe.game_over(test_x_diag_down, [[0, 0]], 2, 0, "x")).to.be.false;
			expect(TicTacToe.game_over(test_o_diag_down, [[0, 0]], 0, 2, "o")).to.be.false;
		});
		it('returns "X wins" if last move made x win', function () {
			expect(TicTacToe.game_over(test_x_hori1, [[0, 0]], 1, 0, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_hori2, [[0, 0]], 2, 1, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_hori3, [[0, 0]], 0, 2, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_vert1, [[0, 0]], 0, 2, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_vert2, [[0, 0]], 1, 0, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_vert3, [[0, 0]], 2, 1, "x")).to.equal("X wins!");

			expect(TicTacToe.game_over(test_x_diag_up, [[0, 0]], 1, 1, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_diag_up, [[0, 0]], 0, 2, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_diag_up, [[0, 0]], 2, 0, "x")).to.equal("X wins!");

			expect(TicTacToe.game_over(test_x_diag_down, [[0, 0]], 1, 1, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_diag_down, [[0, 0]], 0, 0, "x")).to.equal("X wins!");
			expect(TicTacToe.game_over(test_x_diag_down, [[0, 0]], 2, 2, "x")).to.equal("X wins!");
		});
		it('returns "O wins" if last move made o win', function () {
			expect(TicTacToe.game_over(test_o_hori1, [[0, 0]], 1, 0, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_hori2, [[0, 0]], 2, 1, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_hori3, [[0, 0]], 0, 2, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_vert1, [[0, 0]], 0, 2, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_vert2, [[0, 0]], 1, 0, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_vert3, [[0, 0]], 2, 1, "o")).to.equal("O wins!");

			expect(TicTacToe.game_over(test_o_diag_up, [[0, 0]], 1, 1, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_diag_up, [[0, 0]], 0, 2, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_diag_up, [[0, 0]], 2, 0, "o")).to.equal("O wins!");

			expect(TicTacToe.game_over(test_o_diag_down, [[0, 0]], 1, 1, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_diag_down, [[0, 0]], 0, 0, "o")).to.equal("O wins!");
			expect(TicTacToe.game_over(test_o_diag_down, [[0, 0]], 2, 2, "o")).to.equal("O wins!");
		});

		it('returns "Draw" if no moves are left and last move did not win', function () {
			expect(TicTacToe.game_over(test_full, [], 1, 0, "x")).to.equal("Draw!");
			expect(TicTacToe.game_over(test_x_diag_up, [], 0, 0, "x")).to.equal("Draw!");
			expect(TicTacToe.game_over(test_x_diag_down, [], 2, 0, "x")).to.equal("Draw!");
			expect(TicTacToe.game_over(test_x_hori1, [], 1, 1, "x")).to.equal("Draw!");
			expect(TicTacToe.game_over(test_x_diag_up, [], 0, 0, "x")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_x_diag_down, [], 2, 0, "x")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_o_hori1, [], 2, 2, "o")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_o_diag_up, [], 2, 2, "o")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_o_diag_down, [], 0, 2, "o")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_empty, [], 1, 0, "x")).to.equal("Draw!")
			expect(TicTacToe.game_over(test_some, [], 0, 0, "x")).to.equal("Draw!")
		});

		it('returns false when no end game state is reached', function () {
			expect(TicTacToe.game_over(test_empty, [[0, 0]], 1, 0, "x")).to.be.false;
			expect(TicTacToe.game_over(test_some, [[0, 0]], 1, 0, "x")).to.be.false;
		});
    });
});
