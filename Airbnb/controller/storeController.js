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
