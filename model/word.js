var mongoose = require('mongoose');

var wordSchema = mongoose.Schema({
	name: {type: String, required: true, max: 100},
	mean: {type: String, required: true, max: 500},
	type: {type: String, required: true, enum:['v','adj','adv','n'], default: 'v'},
});

wordSchema
.virtual('url')
.get(function(){
	return '/word/' + this._id;
});

module.exports = mongoose.model('word', wordSchema);