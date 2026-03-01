const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/pathutils');

const favouritesFilePath = path.join(rootDir, 'data', 'favourites.json');

function readFavourites(callback) {
    fs.readFile(favouritesFilePath, (err, data) => {
        if (err || !data || data.length === 0) {
            return callback([]);
        }
        try {
            const parsed = JSON.parse(data);
            callback(Array.isArray(parsed) ? parsed : []);
        } catch {
            callback([]);
        }
    });
}

function writeFavourites(favs, callback) {
    fs.writeFile(favouritesFilePath, JSON.stringify(favs), callback);
}

module.exports = class Favourite {
    static add(propertyId, callback) {
        const id = propertyId.toString();

        readFavourites((favs) => {
            if (!favs.includes(id)) {
                favs.push(id);
            }
            writeFavourites(favs, (err) => {
                if (err) {
                    console.error('Error saving favourites:', err);
                }
                if (callback) callback();
            });
        });
    }

    static getAll(callback) {
        readFavourites(callback);
    }
};

