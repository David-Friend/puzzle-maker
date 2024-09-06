const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.card = require('./card.model')
db.puzzle = require('./puzzle.model')



module.exports = db;
