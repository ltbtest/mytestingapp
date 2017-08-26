var express = require('express');
var router = express.Router();
var word = require('../model/word.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	//Add some asynchonous to get all the job from the database. We added job model already.
	//Maybe with this simple app. That is no need to use asunchonous.
	word.find()
	.sort([['name','ascending']])
	.exec(function(err, list_word){
		if (err){
			return next(err);
		} 
		res.render('index', { title: 'My word list', word_list: list_word});
	});
});

router.get('/about', function(req, res, next){
	res.render('about', {title: 'About us'});
});

router.get('/word', function(req, res, next){
	res.render('create_word', {title: 'Create Word'});
});

router.post('/word', function(req, res, next){
	req.checkBody('name','Name must be specified').notEmpty();
	req.checkBody('mean', 'Wrong type').notEmpty();
	
	req.sanitize('name').escape();
	req.sanitize('mean').escape();
	req.sanitize('name').trim();
	req.sanitize('mean').trim();
	
	var wordb = new word({
		name: req.body.name,
		type:req.body.type,
		mean:req.body.mean,
	});
	var errors = req.validationErrors();
	if (errors){
		res.render('create_word', {title: 'Create Word', word: wordb, errors: errors});
	} else{
		wordb.save(function(err){
			if (err){
				return next(err);
			}
			res.redirect(wordb.url);
		});
	}
});
router.get('/word/:id', function(req, res, next){
	word.findById(req.params.id)
	.populate('Word')
	.exec(function(err, wordfinded){
		if (err){
			return next(err);
		}
		res.render('word_detail', {title: 'Word Detail', word_need:wordfinded});
	});
});

module.exports = router;
