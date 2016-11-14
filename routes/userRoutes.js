const express = require('express');
const userRouter = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');

userRouter.get('/users', function(req, res, next){
	//pages lists all users
	User.findAll({})
	.then(function(allUsers){
		// console.log(allUsers);
		if (allusers === null){
			return next(new Error("No users found"));
		}
		res.render('userspage.html', {users: allUsers})
	})
	.catch(function(err){
		res.render('error.html', err);
	});
});

userRouter.post('/users/', function(req, res, next){
	//create a user in the db
});

userRouter.get('/users/:id', function(req, res, next){
	//get an author page
	findingPage = Page.findAll({
		where: {
			authorId: req.params.id
		}
	})
	findingUser = User.findOne({
			where: {
				id: req.params.id
			}
		})
	Promise.all([
		findingPage, findingUser
	])
	.then(function(values){
		const pages = values[0];
		const user = values[1];
		user.pages = pages;
		res.render('authorpage.html', {user: user, pages: pages})
	})	
	.catch(function(err){
		res.render('error.html', err);
	});
});

userRouter.put('/users/:id', function(req, res, next){
	//update the user
});

userRouter.delete('/users/:id', function(req, res, next){
	//delete the user
});

module.exports = userRouter;