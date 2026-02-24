const Property = require('../models/home');

exports.getAddProperty = (req, res, next) => {
    
    res.render('host/add-property', { pageTitle: 'Add Property' });
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


