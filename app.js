'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models');
var router = require('./routes/wiki.js');
var userRouter = require('./routes/userRoutes.js');

//nujucks middleware
var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//send all req to router files

//morgan middleware
app.use(morgan('dev'));

//bodyparser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//serves up static files in public
app.use(express.static('public'));

// app.get('/', (req, res, next) => {
// 	res.render('index.html');
// });
app.use('/wiki', router);
app.use('/userRoutes', userRouter);


//creates tables in db & starts up server
models.User.sync(/*{force: true}*/)
.then(function () {
    return models.Page.sync(/*{force: true}*/)
})
.then(function () {
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

app.use(function(err, req, res, next){
	console.log(err);
	res.status(500).send(err.message);
})