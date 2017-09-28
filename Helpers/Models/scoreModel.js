var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
    playerId: String,
    name: String,
    score: Number
});


var Score = mongoose.model('score',scoreSchema,"scores");


module.exports = {
    score: Score
}