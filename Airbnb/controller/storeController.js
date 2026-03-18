const Property = require('../models/property');
const Favourite = require('../models/favourite');

exports.getAllProperties = (req, res, next) => {
    const properties = Property.find().then(registeredproperty => {
        res.render('store/home-list', {
            pageTitle: 'All Properties',
            properties: registeredproperty,
            isloggedin: req.isloggedin
        });
    });
};

exports.getAllBookings = (req, res, next) => {
    Property.find().then(registeredproperty => {
        res.render('store/bookings', { 
            pageTitle: 'My Bookings',
            properties: registeredproperty,
            isloggedin: req.isloggedin
        });
    });
};  

exports.getFavoriteProperties = (req, res, next) => {
    Favourite.find().populate('propertyId').then(favorites => {
        const favoriteProperties = favorites.map(fav => fav.propertyId);
        res.render('store/favourite-list', { 
            pageTitle: 'My Favourites', 
            properties: favoriteProperties,
            isloggedin: req.isloggedin
        });
    });
};

exports.postaddFavoriteProperty = (req, res, next) => {
    const propertyId = req.body.propertyId;
    Favourite.findOneAndUpdate(
        { propertyId },
        { propertyId },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    )
        .then(() => {
            res.redirect('/favourite-list');
        })
        .catch((err) => {
            console.error('Error adding to favourites:', err);
            res.status(500).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin });
        });
};

exports.getPropertyDetails = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin });
        }
        res.render('store/home-detail', {
            pageTitle: 'Property Details',
            property: property,
            isloggedin: req.isloggedin
        });
    });
};

exports.deleteFavoriteProperty = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Favourite.deleteOne({ propertyId })
        .then(() => {
            res.redirect('/favourite-list');
        })
        .catch((err) => {
            console.error('Error deleting favourite:', err);
            res.status(500).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin });
        });
};