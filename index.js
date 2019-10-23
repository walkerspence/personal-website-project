// SERVER CONFIG -- DO NOT MODIFY THIS FILE

const express = require('express')
var bodyParser = require('body-parser');
const app = express();
const hbs = require('express-handlebars');

const TicTacToe = require('./tictactoe.js')
const NumberGuess = require('./numberguess.js')

app.set('view engine', 'hbs');
app.set('views', __dirname +  "/views");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static("assets"))

app.engine( 'hbs', hbs( {
	extname: 'hbs',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));

const server = app.listen(3000, () => {
	console.log(`Express running at http://localhost:${server.address().port}`);
});


// ROUTES
app.get('/', (req, res) => {
	res.render('home', {layout: "application.hbs"}) 
});

app.get('/about', (req, res) => {
	res.render('about', {layout: "application.hbs"}) 
});

app.get('/photos', (req, res) => {
	res.render('photos', {layout: "application.hbs"}) 
});

app.get('/blog', (req, res) => {
	res.render('blog', {layout: "application.hbs"}) 
});

app.get('/games', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-index" }});
});

var board; 

app.get('/games/tictactoe', (req, res) => {
	board = new TicTacToe.Board();

	res.render('games', { layout: "application.hbs",
						  board: board.board,
						  announcement: `${board.turn.toUpperCase()} goes first!`,
						  whichPartial: () => {return "_games-tictactoe"}});
})

app.get('/games/tictactoe/vs/:move_x/:move_y', (req, res) => {
	var move_x = parseInt(req.params.move_x);
	var move_y = parseInt(req.params.move_y);
	var last_move;

	if (board.empty_space_at(move_x, move_y)) {
		move = board.make_move(move_x, move_y, board.turn);

		var is_game_over = TicTacToe.game_over(board, board.available_moves, move.x, move.y, board.turn)
		if (is_game_over) {
			res.redirect(`/games/TicTacToe/${is_game_over}`)
			return;
		}

		last_move = `${board.turn.toUpperCase()} moved to (${move_x}, ${move_y})`
		board.next_turn();
	} else {
		last_move = `Move invalid`
	}

	console.log(last_move)

	res.render('games', { layout: "application.hbs", 
						  board: board.board,
						  announcement: last_move,
						  whichPartial: () => { return "_games-tictactoe"}})
}); 

app.get('/games/tictactoe/:results', (req, res) => {
	res.render('games', { layout: "application.hbs", 
						  board: board.board,
						  announcement: `${req.params.results}`,
						  whichPartial: () => { return "_games-tictactoe-results"}})
});


app.get('/games/connect4', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-connect4" }});
});

var number_to_guess;

app.get('/games/numberguess', (req, res) => {
	number_to_guess = Math.floor(Math.random() * 20 + 1);

	console.log("Number to guess: " + number_to_guess)

	res.render('games', { layout: "application.hbs", 
						  announcement: "I'm thinking of a number between 1 and 20...",
		                  whichPartial: () => { return "_games-numberguess" }});
});

app.get('/games/numberguess/play:guess?', (req, res) => {
	var guess = parseInt(req.query.guess);
	var announcement = NumberGuess.higher_or_lower(guess, number_to_guess);

	if (announcement == "winner") {
		res.redirect("/games/numberguess/win")
		return;
	}

	res.render('games', { layout: "application.hbs", 
					  	  announcement: announcement,
	                  	  whichPartial: () => { return "_games-numberguess" }});
})

app.get('/games/numberguess/win', (req, res) => {
	res.render('games', {layout: "application.hbs", 
						 announcement: "You win!",
						 whichPartial: () => { return "_games-numberguess-win" } })
})

app.get('/games/storyline', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-storyline" }});
});
