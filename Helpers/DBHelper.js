// Class //
class MongoHelper {
    //Constructor
    constructor(host,db,deployingServer) {
        this._mongoose = require('mongoose');
        this._mongoose.connect(deployingServer ||'mongodb://' + host + '/' + db, function (error) {
            if (error) throw "DB connection failed";
            console.log("DB connection established!!!");
          })
        this._Models = require('./Models/scoreModel');
        this._Score = this._Models.score;
        this._scores;
    }

    //Add score to database
    addScore(playerId,playerName,score){
        var newScore = new this._Score({
            name: playerName,
            score: score
        });
        
        newScore.save(function (err){
            if (err) throw "DB ERROR";
        });
    }

    updateScores(){
        var query = this._Score.find().sort({score: -1}).limit(5);
        var self = this;
        query.exec(function (err,scores){
            self._scores = scores;
        });
    }

    getScores(){
        return this._scores;
    }

}

//exports
module.exports = MongoHelper;