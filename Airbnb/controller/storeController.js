const Property = require('../models/property');
const User = require('../models/user');

exports.getAllProperties = (req, res, next) => {
    console.log("Session Data:", req.session);
    const properties = Property.find().then(registeredproperty => {
        res.render('store/home-list', {
            pageTitle: 'All Properties',
            properties: registeredproperty,
            isloggedin: req.isloggedin,
            user: req.session.user
        });
    });
};

exports.getAllBookings = (req, res, next) => {
    Property.find().then(registeredproperty => {
        res.render('store/bookings', { 
            pageTitle: 'My Bookings',
            properties: registeredproperty,
            isloggedin: req.isloggedin,
            user: req.session.user
        });
    });
};  

exports.getFavoriteProperties = (req, res, next) => {
    const userId = req.session.user && (req.session.user._id || req.session.user.id);
    if (!userId) {
        return res.redirect('/login');
    }

    User.findById(userId).populate('favourites').then(user => {
        if (!user) {
            return res.status(404).render('404', { pageTitle: 'User Not Found', isloggedin: req.isloggedin, user: req.session.user });
        }

        res.render('store/favourite-list', { 
            pageTitle: 'My Favourites', 
            properties: user.favourites,
            isloggedin: req.isloggedin,
            user: req.session.user
        });
    });
};

exports.postaddFavoriteProperty = async (req, res, next) => {
    try {
        const propertyId = req.body.propertyId;
        const userId = req.session.user && (req.session.user._id || req.session.user.id);

        if (!userId || !propertyId) {
            return res.redirect('/favourite-list');
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).render('404', { pageTitle: 'User Not Found', isloggedin: req.isloggedin, user: req.session.user });
        }

        if (!user.favourites.some((favId) => favId.toString() === propertyId.toString())) {
            user.favourites.push(propertyId);
            await user.save();
        }

        return res.redirect('/favourite-list');
    } catch (err) {
        console.error('Error adding to favourites:', err);
        return res.status(500).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin, user: req.session.user });
    }
};

exports.getPropertyDetails = (req, res, next) => {
    const propertyId = req.params.propertyId;

    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin, user: req.session.user });
        }
        res.render('store/home-detail', {
            pageTitle: 'Property Details',
            property: property,
            isloggedin: req.isloggedin,
            user: req.session.user
        });
    });
};

exports.deleteFavoriteProperty = async (req, res, next) => {
    try {
        const propertyId = req.params.propertyId;
        const userId = req.session.user && (req.session.user._id || req.session.user.id);

        if (!userId || !propertyId) {
            return res.redirect('/favourite-list');
        }

        await User.findByIdAndUpdate(userId, { $pull: { favourites: propertyId } });
        return res.redirect('/favourite-list');
    } catch (err) {
        console.error('Error deleting favourite:', err);
        return res.status(500).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin, user: req.session.user });
    }
};