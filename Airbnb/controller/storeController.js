const Property = require('../models/home');


exports.getAllProperties = (req, res, next) => {
    const properties = Property.fetchAll( (registeredproperty) => {
        res.render('store/home-list', { 
            pageTitle: 'All Properties', 
            properties: registeredproperty 
        });
    }
        );
    
}

exports.getAllBookings = (req, res, next) => {
    Property.fetchAll((registeredproperty) => {
        res.render('store/bookings', { 
            pageTitle: 'My Bookings',
            properties: registeredproperty 
        });
    });
}   

exports.getFavoriteProperties = (req, res, next) => {
    Property.fetchAll((registeredproperty) => {
        res.render('store/favourite-list', {
            pageTitle: 'My Favourites',
            properties: registeredproperty
        });
    });
}

exports.postaddFavoriteProperty = (req, res, next) => {
    const propertyId = req.body.propertyId;
    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
    });
    res.redirect('/favourite-list');
}

exports.getPropertyDetails = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        res.render('store/home-detail', {
            pageTitle: 'Property Details',
            property: property
        });
    });
}
