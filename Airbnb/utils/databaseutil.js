const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url =  'mongodb+srv://harismasood012:admin123@hariscluster.0xiex7v.mongodb.net/?appName=HarisCluster'

let _db;

const MongoConnect = (callback) => {
    MongoClient.connect(url).then((client) => {
        console.log('Connected to MongoDB!');
        _db = client.db('airbnb');
        callback(client);
    }).catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });
}

module.exports = MongoConnect;

module.exports.getDb = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('No database found!');
    }
};
