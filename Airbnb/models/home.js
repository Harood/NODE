const db = require('../utils/databaseutil');

module.exports = class Property {
    constructor(houseName, location, price, image, rating, description, id) {
        this.houseName = houseName; 
        this.location = location;
        this.price = price;
        this.image = image;
        this.rating = rating;
        this.description = description;
        this.id = id;
    }

    save() {
        if (this.id) {
            return db.execute(
                'UPDATE homes SET houseName = ?, location = ?, price = ?, image = ?, rating = ?, description = ? WHERE id = ?',
                [this.houseName, this.location, this.price, this.image, this.rating, this.description, this.id]
            );
        } else {
            return db.execute(
                'INSERT INTO homes (houseName, location, price, image, rating, description) VALUES (?, ?, ?, ?, ?, ?)',
                [this.houseName, this.location, this.price, this.image, this.rating, this.description]
            );
        }
       
    }

    static fetchAll(callback) {
        return db.execute('SELECT * FROM homes');
    }
    static findById(id, callback) {
        return db.execute('SELECT * FROM homes WHERE id = ?', [id]);
        
    }
    static deleteById(id, callback) {
        return db.execute('DELETE FROM homes WHERE id = ?', [id]);
        
    }
}