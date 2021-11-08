// Define and load the database for the persistance layer
const Datastore = require('nedb');
const database = new Datastore("database.db");
database.loadDatabase();

exports.getHomepage = (req, res) => {
    res.render('./pages/homepage')
}

exports.getExpeditions = (req, res) => {
    database.find({ reference: "expedition" }, (err, data) => {
        if(!err){
            res.render('./pages/expeditions', {expedition_data: data});
        }
        else{
            console.log(err)
        }
    });
}

exports.getInsights = (req, res) => {
    database.find({ reference: "insights" }, (err, data) => {
        if(!err){
            res.render('./pages/insights', {insights_data: data});
        }
        else{
            console.log(err)
        }
    });
}



