// SERVER CONFIG

const express = require('express')
var bodyParser = require('body-parser');
const app = express();
const hbs = require('express-handlebars');

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
	console.log(`Express running at localhost:${server.address().port}`);
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

app.get('/games/tictactoe', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-tictactoe" }});
});

app.get('/games/connect4', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-connect4" }});
});

app.get('/games/numberguess', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-numberguess" }});
});

app.get('/games/storyline', (req, res) => {
	res.render('games', { layout: "application.hbs", 
		                  whichPartial: () => { return "_games-storyline" }});
});