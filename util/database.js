const mongdb = require('mongodb')
const MongoClient = mongdb.MongoClient

//A variable that will allow one connection to the database be used throughout the whole program
//  to avoid establishing many different connections throughout the program
let _db

const mongoConnect = callback => {
    MongoClient.connect("ENTER HERE")
    .then(client => {
        console.log('Connected!')
        _db = client.db()
        callback()
    })
    .catch(err => {console.log(err)})
 }

const getDb = () => {
    if (_db) {
        return _db
    }
    throw "No database found!"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb