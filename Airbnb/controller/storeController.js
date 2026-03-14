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
    Promise.all([Favourite.getAll(), Property.fetchAll()])
        .then(([favourites, registeredproperty]) => {
            const favouriteIds = favourites.map((fav) => String(fav.propertyId));
            const favouriteProps = registeredproperty.filter((p) =>
                favouriteIds.includes(String(p._id))
            );

            res.render('store/favourite-list', {
                pageTitle: 'My Favourites',
                properties: favouriteProps
            });
        })
        .catch((err) => {
            console.error('Error loading favourites:', err);
            res.status(500).render('404', { pageTitle: 'Page Not Found' });
        });
};

exports.postaddFavoriteProperty = (req, res, next) => {
    const propertyId = req.body.propertyId;
    const favourite = new Favourite(propertyId);
    favourite.save()
        .then(() => {
            console.log('Property added to favourites');
            res.redirect('/favourite-list');
        })
        .catch((err) => {
            console.error('Error adding to favourites:', err);
            res.status(500).render('404', { pageTitle: 'Page Not Found' });
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

    Favourite.remove(propertyId)
        .then(() => {
            res.redirect('/favourite-list');
        })
        .catch((err) => {
            console.error('Error deleting favourite:', err);
            res.status(500).render('404', { pageTitle: 'Page Not Found' });
        });
};