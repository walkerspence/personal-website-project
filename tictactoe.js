/* 
	coorinates on board:
		0,0 1,0 2,0
		0,1 1,1 2,1
		0,2 1,2 2,2

	to run tests, use the terminal command "npm test test/tictactoe.spec". This will run tests for all parts of the tic tac toe assignment.
*/
function opposite_symbol(symbol) {
	/*  inputs: symbol: either "x" or "o"

		RETURN "x" if symbol == x, "o" otherwise
    */
}

function three_horizontally(board, last_y, last_symbol) {
	/*  inputs: board: a board object
		   		last_y: the y coordinate of the last symbol placed
		   		last_symbol: the last symbol placed (either x or o)

   		RETURN true if three symbols in a row horizontally, false otherwise

   		HINT: call board.get_symbol_at(x, y) to get the symbol at coordinate (x, y)
    */
}

function three_vertically(board, last_x, last_symbol) {
	/*  inputs: board: a board object
			    last_x: the x coordinate of the last symbol placed
			    last_symbol: the last symbol placed (either x or o)

		RETURN true if three symbols in a row vertically, false otherwise
	*/
}

function three_diagonally_down(board, last_symbol) {
	/*  inputs: board: a board object
			    last_symbol: the last symbol placed (either x or o)

		RETURN true if three symbols in a row diagonally down (0, 0) (1, 1) (2, 2), false otherwise
	*/
}

function three_diagonally_up(board, last_symbol) {
	/*  inputs: board: a board object
		    	last_symbol: the last symbol placed (either x or o)

		RETURN true if three symbols in a row diagonally up (0, 2) (1, 1) (2, 0), false otherwise
	*/
}

function game_over(board, no_moves_left, last_x, last_y, last_symbol) { 
	/* inputs: board: a board object
			   available_moves: a list of available moves (available_moves.length == 0 when no moves left)
			   last_x: the x coordinate of the last symbol placed
			   last_y: the y coordinate of the last symbol placed
			   last_symbol: the last symbol placed (either x or o)

	   RETURN "X wins!" when x makes three in a row on the last turn, "O wins!" when o makes three in a row on the last turn,
	   		  "Draw!" if no available moves left or false if the game should continue

	   HINT: To pass this test, only call "three_diagonally_up" and "three_diagonally_down" when the last move falls on the up or down diagonal, respectively
	*/

}

// STARTER GAME CODE:

function Board(player2_ai = false) { 
	this.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
	this.turn = "x";
	this.available_moves = init_available_moves();

	this.next_turn = function() {
		console.log(`${this.turn.toUpperCase()}'s turn!`);

		this.turn = opposite_symbol(this.turn);
	}

    this.get_symbol_at = function (x, y) { 
    	return (this.empty_space_at(x, y)) ? " " : this.board[y][x] 
    }

    this.make_move = function(x, y, turn_symbol) { 
    	this.board[y][x] = turn_symbol;
    	move = {x: x, y: y}
    	this.available_moves.splice(this.move_index_search(move), 1)
    	return move
    }

	this.print = function () {
		console.log("-------------")
		console.log(`| ${this.get_symbol_at(0, 0)} | ${this.get_symbol_at(1, 0)} | ${this.get_symbol_at(2, 0)} |`)
		console.log(`| ${this.get_symbol_at(0, 1)} | ${this.get_symbol_at(1, 1)} | ${this.get_symbol_at(2, 1)} |`)
		console.log(`| ${this.get_symbol_at(0, 2)} | ${this.get_symbol_at(1, 2)} | ${this.get_symbol_at(2, 2)} |`)
		console.log("-------------")
	}

	this.empty_space_at = function(x, y) {
		return (this.board[y][x] == " ");
	}

	this.assign_column = function(symbol, x_axis) {
		for (i = 0; i < 3; i++) {
			this.board[i][x_axis] = symbol;
		}
	}

	this.assign_up_diag = function(symbol) {
		this.board[2][0] = symbol;
		this.board[1][1] = symbol;
		this.board[0][2] = symbol;
	}

	this.assign_down_diag = function(symbol) {
		this.board[0][0] = symbol;
		this.board[1][1] = symbol;
		this.board[2][2] = symbol;
	}

	this.move_index_search = function (move) { //This function exists because there's no way to quickly compare arrays in JavaScript.
		for (i = 0; i < this.available_moves.length; i++) {  //You shouldn't need to call it. 
			var move_check = this.available_moves[i]
			if (move_check[0] == move.x && move_check[1] == move.y) {
				return i; 
			}
		}

		return false; 
	}
};

function get_random_int(max) { //this function generates a random integer between 0
	return Math.floor(Math.random() * Math.floor(max))
}



function init_available_moves() {
	var empty = [];

	for (y = 0; y < 3; y++) {
		for (x = 0; x < 3; x++) {
			empty.push([x, y])
		}
	}

	return empty;
}

module.exports = { 
	Board: Board,
	game_over: game_over,
	opposite_symbol: opposite_symbol,
	three_horizontally: three_horizontally,
	three_vertically: three_vertically,
	three_diagonally_up: three_diagonally_up,
	three_diagonally_down: three_diagonally_down,
	game_over: game_over
}


