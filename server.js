const mysql = require('mysql');
const mongoose = require('mongoose');
const dbConfig = require('./config');

// query to get values from tables
let sqlquery = 'SELECT * FROM studentinfo NATURAL JOIN parents;'

function scripted() {
    // connect to mysql
    let connection = mysql.createConnection(dbConfig.mysql)
        // execute query
    connection.query(sqlquery, (error, result, fields) => {
        if (error) {
            console.log('ERROR::', error)
        }
        var data = result
        console.log(data);

        if (result) {
            console.log('extracted from sql')
                // connect to mongodb
            mongoose.connect(dbConfig.mongodbUrl, { useNewUrlParser: true }, function(err, db) {
                if (err) {
                    console.log('mongoerr::', err);
                }
                // drop/empty collection
                db.collection('students').drop()
                console.log('droped collection')
                    // insert json data into mongodb 
                db.collection('students').insertMany(data, function(err, res) {
                    if (err) throw err;
                    console.log('successfully inserted into monogdb')
                        // close mongodb
                    db.close();
                })
            })
        }

    });
    // close mysql
    connection.end()
}
// call function
scripted();
// call function for every 1 minute
setInterval(scripted, 60 * 1000);