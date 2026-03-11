const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url =  'mongodb+srv://harismasood012:admin123@hariscluster.0xiex7v.mongodb.net/?appName=HarisCluster'

const MongoConnect = (callback) => {
    MongoClient.connect(url).then((client) => {
        console.log(client);
        callback(client);
    }).catch((err) => {
        console.log("Error connecting to MongoDB:", err);
    });
}

module.exports = MongoConnect;
