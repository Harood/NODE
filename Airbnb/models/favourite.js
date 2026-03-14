const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/databaseutil');


module.exports = class Favourite {
    
    constructor(propertyId) {
        this.propertyId = propertyId;
    }
    
    save() {
        const db = getDb();
        return db.collection('favourites').updateOne(
            { propertyId: String(this.propertyId) },
            { $set: { propertyId: String(this.propertyId) } },
            { upsert: true }
        );
    }


    static getAll() {
        const db = getDb();
        return db.collection('favourites').find().toArray();
    }

    static remove(propertyId) {
        const db = getDb();
        return db.collection('favourites').deleteOne({ propertyId: String(propertyId) });
    }
};

