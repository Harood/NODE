const Property = require('../models/home');
const Favourite = require('../models/favourite');

exports.getAllProperties = (req, res, next) => {
    const properties = Property.fetchAll().then(registeredproperty => {
        res.render('store/home-list', {
            pageTitle: 'All Properties',
            properties: registeredproperty
        });
    });
};

exports.getAllBookings = (req, res, next) => {
    Property.fetchAll().then(registeredproperty => {
        res.render('store/bookings', { 
            pageTitle: 'My Bookings',
            properties: registeredproperty 
        });
    });
};  

exports.getFavoriteProperties = (req, res, next) => {
    Favourite.getAll((favouriteIds) => {
        Property.fetchAll().then(registeredproperty => {
            const favouriteProps = registeredproperty.filter((p) =>
                favouriteIds.includes(p._id.toString())
            );

            res.render('store/favourite-list', {
                pageTitle: 'My Favourites',
                properties: favouriteProps
            });
        });
    });
};

exports.postaddFavoriteProperty = (req, res, next) => {
    const propertyId = req.body.propertyId;

    if (!propertyId) {
        return res.redirect('/');
    }

    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }

        Favourite.add(propertyId, () => {
            res.redirect('/favourite-list');
        });
    });
};

exports.getPropertyDetails = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        res.render('store/home-detail', {
            pageTitle: 'Property Details',
            property: property
        });
    });
};

exports.deleteFavoriteProperty = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Favourite.remove(propertyId, (err) => {
        if (err) {
            console.error('Error deleting favourite:', err);
            return res.status(500).render('404', { pageTitle: 'Page Not Found' });
        }
        res.redirect('/favourite-list');
    });
};