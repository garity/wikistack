const express = require('express');
const router = express.Router();
const models = require('../models');

const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next){
	//retrieve all wiki pages
	res.redirect('/');
});

router.post('/', function(req, res, next){
	//submit new page to database
	const page = Page.build({
		title: req.body.title,
		content: req.body.content
	});

	page.save()
	.then(function(content){
		res.json(content);
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});


router.get('/add', function(req, res, next){
	//retrieve the 'add a page' form
	res.render('addpage');
});


router.get('/:urlTitle', function(req, res, next){
	const urlTitle = req.params.urlTitle;
	res.send('hit dynamic route at ' + urlTitle);
});




router.get('/users/', function(req, res, next){
	//get all users
});

router.post('/users/', function(req, res, next){
	//create a user in the db
})

router.get('/users/:id', function(req, res, next){
	//get a paticular user
});

router.put('/users/:id', function(req, res, next){
	//update the user
});

router.delete('/users/:id', function(req, res, next){
	//delete the user
});


function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}

module.exports = router;
