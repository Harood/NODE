const Property = require('../models/property');

exports.getAddProperty = (req, res, next) => {
    
    res.render('host/edit-property', { pageTitle: 'Add Property', edit: false, isloggedin: req.isloggedin, user: req.session.user    });
    
}

exports.getHostProperties = (req, res, next) => {
    const properties = Property.find().then(registeredproperty => {
        res.render('host/hostHome-list', { 
            pageTitle: 'Host Homes List', 
            properties: registeredproperty,
            isloggedin: req.isloggedin,
            user: req.session.user
        });
    }
);
    
}

exports.postAddProperty =  (req, res, next) => {
    console.log('Property Registered:', req.body);
    const { houseName, location, price, photoUrl, image, rating, description } = req.body;
    const imageUrl = photoUrl || image;
    const newProperty = new Property({houseName, location, price, photoUrl: imageUrl, rating, description});
    newProperty.save().then(() => {
        console.log('Property saved to database');
        res.render('host/propertyadded', { pageTitle: 'Property Added Successfully', isloggedin: req.isloggedin, user: req.session.user });
    }).catch((err) => {
        console.error('Error saving property:', err);
        res.status(500).render('404', { pageTitle: 'Error adding property', isloggedin: req.isloggedin, user: req.session.user });
    });
}

exports.getEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const edit = req.query.edit === 'true';

    Property.findById(propertyId).then(property=> {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin, user: req.session.user  });
        }
        res.render('host/edit-property', { pageTitle: 'Edit Property', property: property, edit: edit, isloggedin: req.isloggedin, user: req.session.user });
    });
};
exports.postEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const { houseName, location, price, photoUrl, image, rating, description } = req.body;
    const imageUrl = photoUrl || image;
    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found', isloggedin: req.isloggedin, user: req.session.user });
        }
        property.houseName = houseName;
        property.location = location;
        property.price = price;
        property.photoUrl = imageUrl;
        property.rating = rating;
        property.description = description;
        return property.save();
    }).then(() => {
        res.redirect('/host/hostHome-list');
    }).catch((err) => {
        console.error('Error updating property:', err);
        res.status(500).render('404', { pageTitle: 'Error updating property', isloggedin: req.isloggedin, user: req.session.user });
    });
};

exports.deleteProperty = (req, res, next) => {
    const propertyId = req.params.id;

    Property.findByIdAndDelete(propertyId).then(() => {
        res.redirect('/host/hostHome-list');
    }).catch((err) => {
        console.error('Error deleting property:', err);
        res.status(500).render('404', { pageTitle: 'Error deleting property', isloggedin: req.isloggedin, user: req.session.user });
    });
    
};
