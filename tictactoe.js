function game_over(board, available_moves, last_x, last_y, last_symbol) { // RETURN "x wins!", "y wins!", "draw" or false
	/*
	0,0 1,0 2,0
	0,1 1,1 2,1
	0,2 1,2 2,2
	*/

	var last_move_won = false;

	if (last_x == last_y) {
		last_move_won |= three_diagonally_down(board, last_symbol);
	} 

	if (last_x + last_y == 2) {
		last_move_won |= three_diagonally_up(board, last_symbol);
	} 

	last_move_won |= three_horizontally(board, last_y, last_symbol) || three_vertically(board, last_x, last_symbol); 

	if (last_move_won) {
		return last_symbol.toUpperCase() + " wins!";
	} else if (!available_moves.length) {
		return "Draw!";
	} else {
		return false;
	}
}

function three_horizontally(board, last_y, last_symbol) {
	return (board.get_symbol_at(0, last_y) == last_symbol) && (board.get_symbol_at(1, last_y) == last_symbol) && (board.get_symbol_at(2, last_y) == last_symbol)
}

function three_vertically(board, last_x, last_symbol) {
	return (board.get_symbol_at(last_x, 0) == last_symbol) && (board.get_symbol_at(last_x, 1) == last_symbol) && (board.get_symbol_at(last_x, 2) == last_symbol)
}

function three_diagonally_down(board, last_symbol) {
	return (board.get_symbol_at(0, 0) == last_symbol) && (board.get_symbol_at(1, 1) == last_symbol) && (board.get_symbol_at(2, 2) == last_symbol)
}

function three_diagonally_up(board, last_symbol) {
	return (board.get_symbol_at(0, 2) == last_symbol) && (board.get_symbol_at(1, 1) == last_symbol) && (board.get_symbol_at(2, 0) == last_symbol)
}

function opposite_symbol(symbol) {
	return symbol == "o" ? "x" : "o"; 
}

// RUNS GAME: 

// STARTER GAME CODE:

function Board(player2_ai = false) { 
	this.board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
	this.turn = "x";
	this.available_moves = init_available_moves();

	this.next_turn = function() {
		console.log(`${this.turn.toUpperCase()}'s turn!`);

		this.turn = opposite_symbol(this.turn);
	}

	this.end_game = function (move) {
		return game_over(this.board, this.available_moves, move.x, move.y, opposite_symbol(this.turn.symbol))
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
		console.log(`| ${this.get_symbol_at(0, 0)} | ${this.get_symbol_at(0, 1)} | ${this.get_symbol_at(0, 2)} |`)
		console.log(`| ${this.get_symbol_at(1, 0)} | ${this.get_symbol_at(1, 1)} | ${this.get_symbol_at(1, 2)} |`)
		console.log(`| ${this.get_symbol_at(2, 0)} | ${this.get_symbol_at(2, 1)} | ${this.get_symbol_at(2, 2)} |`)
		console.log("-------------")
	}

	this.empty_space_at = function (x, y) {
		return (this.board[y][x] == " ");
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
	board: Board,
	game_over: game_over
}


