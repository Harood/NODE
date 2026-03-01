const Property = require('../models/home');

exports.getAddProperty = (req, res, next) => {
    
    res.render('host/edit-property', { pageTitle: 'Add Property', edit: false });
}

exports.getHostProperties = (req, res, next) => {
    const properties = Property.fetchAll( (registeredproperty) => {
        res.render('host/hostHome-list', { 
            pageTitle: 'Host Homes List', 
            properties: registeredproperty 
        });
    }
        );
    
}

exports.postAddProperty =  (req, res, next) => {
    console.log('Property Registered:', req.body);
    const { title, location, price, image } = req.body;
    const newProperty = new Property(title, location, price, image);
    newProperty.save();

    res.render('host/propertyadded', { pageTitle: 'Property Added Successfully' });
}

exports.getEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const edit = req.query.edit === 'true';

    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        res.render('host/edit-property', { pageTitle: 'Edit Property', property: property, edit: edit });
    });
};
exports.postEditProperty = (req, res, next) => {
    const propertyId = req.params.id;
    const { id, title, location, price, image } = req.body;
    Property.findById(propertyId, (property) => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        property.id = id;
        property.title = title;
        property.location = location;
        property.price = price;
        property.image = image;
        property.save();
        res.redirect('/host/hostHome-list');
    });
};