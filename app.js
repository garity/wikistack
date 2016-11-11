'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var models = require('./models');

var env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    server.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
})
.catch(console.error);

app.listen(3000);