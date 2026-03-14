const { ObjectId } = require('mongodb');
const { getDb } = require('../utils/databaseutil');

module.exports = class Property {
    constructor(houseName, location, price, image, rating, description, id) {
        this.houseName = houseName; 
        this.location = location;
        this.price = price;
        this.image = image;
        this.rating = rating;
        this.description = description;
        this._id = id;
    }

    save() {
            const db = getDb();
            if (this._id) {
                const updateData = {
                    houseName: this.houseName,
                    location: this.location,
                    price: this.price,
                    image: this.image,
                    rating: this.rating,
                    description: this.description
                };
                return db.collection('homes').updateOne({ _id: new ObjectId(String(this._id)) }, { $set: updateData });
            } else {
                return db.collection('homes').insertOne(this);
            }
        
       
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('homes').find().toArray();
    }
    static findById(id) {
        const db = getDb();
        return db.collection('homes')
            .find({ _id: new ObjectId(String(id)) })
            .next()
            .then((property) => {
                if (!property) {
                    return null;
                }

                return new Property(
                    property.houseName,
                    property.location,
                    property.price,
                    property.image,
                    property.rating,
                    property.description,
                    property._id
                );
            });
    }
    static deleteById(id) {
        const db = getDb();
        return db.collection('homes').deleteOne({ _id: new ObjectId(String(id)) });
    }
}