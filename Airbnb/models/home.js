const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');


module.exports = class Property {
    constructor(title, location, price, image) {
        this.title = title; 
        this.location = location;
        this.price = price;
        this.image = image;
    }

    save() {
        Property.fetchAll( (registeredproperty) => {
            registeredproperty.push(this);
            const propertiesFilePath = path.join(rootDir, 'data', 'properties.json');
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
            callback(!err ? JSON.parse(data) : []);
        });
    }
}