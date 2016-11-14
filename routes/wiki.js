const express = require('express');
const router = express.Router();
const models = require('../models');

const Page = models.Page;
const User = models.User;

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
	// console.log("req body", req.body);
	// const page = Page.build({
	// 	author: req.body.author,
	// 	email: req.body.email,
	// 	title: req.body.title,
	// 	content: req.body.content,
	// 	status: req.body.status
	// });


	// page.save()
	// .then(function(page){
	// 	res.redirect(page.route);
	// })
	// .catch(function(err){
	// 	res.render('error.html', err);
	// });


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
});


router.get('/add', function(req, res, next){
	//retrieve the 'add a page' form
	res.render('addpage');
});


router.get('/:urlTitle', function(req, res, next){
	const url = req.params.urlTitle;

	Page.findOne({
		where: {
			urlTitle: url
		}
	})
	.then(function(currPage){
		const pageAuthor = currPage.getAuthor();
		pageAuthor
		.then(function(value){
			res.render('wikipage.html', {page: currPage, author: value});
		});
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});

router.get('/users/', function(req, res, next){
	//get all users
	User.findAll({})
	.then(function(allUsers){
		console.log(allUsers);
		res.render('users.html', {users: allUsers})
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});

router.post('/users/', function(req, res, next){
	//create a user in the db
})

router.get('/users/:id', function(req, res, next){
	//get a paticular user (author page)
	Page.findAll({
		where: {
			authorId: req.params.id
		}
	})
	.then(function(pages){
		User.findOne({
			where: {
				id: req.params.id
			}
		})
		.then(function(user){
			console.log(user);
			res.render('authorpage.html', {user: user, pages: pages})
		})	
	})
	.catch(function(err){
		res.render('error.html', err);
	});
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
