const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');


const propertiesFilePath = path.join(rootDir, 'data', 'properties.json');

module.exports = class Property {
    constructor(title, location, price, image) {
        this.title = title; 
        this.location = location;
        this.price = price;
        this.image = image;
    }

    save() {
       
        Property.fetchAll( (registeredproperty) => {
            if (this.id) {
                let updated = false;
                registeredproperty = registeredproperty.map(p => {
                    if (p.id && p.id.toString() === this.id.toString()) {
                        updated = true;
                        return this;
                    }
                    return p;
                });

                if (!updated) {
                    registeredproperty.push(this);
                }
            } else {
                this.id = Math.random().toString(36);
                registeredproperty.push(this);
            }
            fs.writeFile(propertiesFilePath, JSON.stringify(registeredproperty), (err) => {
            if (err) {
                console.error('Error saving property:', err);
            } else {
                console.log('Property saved successfully!');
            }
        });
        });
    }

    static fetchAll(callback) {
        const propertiesFilePath = path.join(rootDir, 'data', 'properties.json');
        fs.readFile(propertiesFilePath, (err, data) => {
            console.log('Reading properties from file...');
            if (err || !data || data.length === 0) {
                callback([]);
            } else {
                callback(JSON.parse(data));
            }
        });
    }
    static findById(id, callback) {
        Property.fetchAll((properties) => {
            const propertyFound = properties.find(p => p.id.toString() === id);
            callback(propertyFound);
        });
    }
    static deleteById(id, callback) {
        this.fetchAll((properties) => { properties = properties.filter(p => p.id.toString() !== id);
            fs.writeFile(propertiesFilePath, JSON.stringify(properties), callback) ;
        });
    }
}