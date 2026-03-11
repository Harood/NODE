const Property = require('../models/home');

exports.getAddProperty = (req, res, next) => {
    
    res.render('host/edit-property', { pageTitle: 'Add Property', edit: false });
}

exports.getHostProperties = (req, res, next) => {
    const properties = Property.fetchAll().then( ([registeredproperty]) => {
        res.render('host/hostHome-list', { 
            pageTitle: 'Host Homes List', 
            properties: registeredproperty 
        });
    }
);
    
}

exports.postAddProperty =  (req, res, next) => {
    console.log('Property Registered:', req.body);
    const { houseName, location, price, image, rating, description } = req.body;
    const newProperty = new Property(houseName, location, price, image, rating, description);
    newProperty.save();

    res.render('host/propertyadded', { pageTitle: 'Property Added Successfully' });
}

exports.getEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const edit = req.query.edit === 'true';

    Property.findById(propertyId).then(([property]) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        res.render('host/edit-property', { pageTitle: 'Edit Property', property: property, edit: edit });
    });
};
exports.postEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const { id, houseName, location, price, image, rating, description } = req.body;
    Property.findById(propertyId).then(([property]) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        property.id = id;
        property.houseName = houseName  ;
        property.location = location;
        property.price = price;
        property.image = image;
        property.rating = rating;
        property.description = description;
        property.save();
        res.redirect('/host/hostHome-list');
    });
};

exports.deleteProperty = (req, res, next) => {
    const propertyId = req.params.id;

        Property.deleteById(propertyId, (err) => {
            if (err) {
                console.error('Error deleting property:', err);
                return res.status(500).render('404', { pageTitle: 'Page Not Found' });
            }

            res.redirect('/host/hostHome-list');
        });
};
