const mysql = require('mysql');
const mongoose = require('mongoose');
const dbConfig = require('./config');

let connection = mysql.createConnection(dbConfig.mysql)

let sqlquery = 'SELECT * FROM studentinfo NATURAL JOIN parents;'

connection.query(sqlquery, (error, result, fields) => {
    if (error) {
        console.log('ERROR::', error)
    }
    var data = result
    console.log(data);
    if (result) {
        console.log('extracted from sql')
        mongoose.connect(dbConfig.mongodbUrl, { useNewUrlParser: true }, function(err, db) {
            if (err) {
                console.log('mongoerr::', err);
            }
            db.collection('students').drop()
            console.log('droped collection')
            db.collection('students').insertMany(data, function(err, res) {
                if (err) throw err;
                console.log('successfully inserted into monogdb')
                db.close();
            })
        })
    }

});

connection.end()