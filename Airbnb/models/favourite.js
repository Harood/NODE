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

function writeFavourites(ids, callback) {
    fs.writeFile(favouritesFilePath, JSON.stringify(ids), callback);
}

module.exports = class Favourite {
    static getAll(callback) {
        readFavourites(callback);
    }

    static add(propertyId, callback) {
        const id = propertyId.toString();
        readFavourites((ids) => {
            if (!ids.includes(id)) {
                ids.push(id);
            }
            writeFavourites(ids, (err) => {
                if (err) {
                    console.error('Error saving favourites:', err);
                }
                if (callback) callback(err);
            });
        });
    }

    static remove(propertyId, callback) {
        const id = propertyId.toString();
        readFavourites((ids) => {
            const filtered = ids.filter((favId) => favId !== id);
            writeFavourites(filtered, (err) => {
                if (err) {
                    console.error('Error saving favourites:', err);
                }
                if (callback) callback(err);
            });
        });
    }
};

