const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');

router.get('/', function(req, res, next){
	//retrieve all wiki pages
	Page.findAll({})
	.then(function(pages){
		res.render('index.html', {pages: pages})
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});

router.post('/', function(req, res, next){
	models.User.findOrCreate({
		where:{
			name: req.body.name,
			email: req.body.email
		}
	})
	.then(function(user){
		const page = Page.build({
			title: req.body.title,
			content: req.body.content,
			status: req.body.status
		});

		var author = user[0];
		// page.belongsTo(user);
		return page.save()
		.then(function(page){
			return page.setAuthor(author);
		})
		.then(function(page){
			res.redirect(page.route);
		})
		.catch(function(err){
			res.render('error.html', err);
		});					
	});
	// const page = Page.build(req.body);
	// page.save()
	// .then(function(page){
	// 	res.redirect(page.route);
	// })
	// .catch(function(err){
	// 	res.render('error.html', err);
	// });
});


router.get('/add', function(req, res, next){
	//retrieve the 'add a page' form
	res.render('addpage');
});


router.get('/:urlTitle', function(req, res, next){
	//gets particular post
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(currPage){
		if (currPage === null){
			return next(new Error("Page was not found!"));
		}
		return currPage.getAuthor()
		.then(function(value){
			res.render('wikipage.html', {page: currPage, author: value});
		});
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});


module.exports = router;
