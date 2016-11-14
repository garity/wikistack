const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next){
	//retrieve all wiki pages
	res.send('got to Get /wiki/');
});

router.post('/', function(req, res, next){
	//submit new page to database
	res.send('got to Post /wiki/');
});

router.get('/add', function(req, res, next){
	//retrieve the 'add a page' form
	res.render('addpage');
});

module.exports = router;
