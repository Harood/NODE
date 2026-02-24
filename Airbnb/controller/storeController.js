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

exports.getPropertyDetails = (req, res, next) => {
    const propertyId = req.params.propertyId;
    Property.fetchAll( (registeredproperty) => {
        const property = registeredproperty.find(p => p.id.toString() === propertyId);
        if (property) {
            res.render('store/home-detail', { 
                pageTitle: 'Property Details', 
                property: property 
            });
        } else {
            res.status(404).render('error', { pageTitle: 'Property Not Found' });
        }
    }
        );
    
}
