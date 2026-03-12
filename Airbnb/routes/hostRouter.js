// External Modules
const express = require('express');
const hostRouter = express.Router();

// Models
const Property = require('../models/home');
const hostController = require('../controller/hostController');

// Add property (GET)
hostRouter.get('/host/add-property', (req, res) => {
    res.render('host/edit-property', { pageTitle: 'Add Property', edit: false });
});

// Add property (POST)
hostRouter.post('/host/add-property', (req, res) => {
    const { houseName, location, price, image, rating, description } = req.body;
    const newProperty = new Property(houseName, location, price, image, rating, description);
    newProperty.save();

    res.render('host/propertyadded', { pageTitle: 'Property Added Successfully' });
});

// List all host properties
hostRouter.get('/host/hostHome-list', (req, res) => {
    Property.fetchAll().then(properties => {
        res.render('host/hostHome-list', { 
            pageTitle: 'Host Homes List', 
            properties: properties 
        });
    });
});

// Edit property (GET)
hostRouter.get('/host/edit-property/:id', (req, res) => {
    const propertyId = req.params.id;
    const edit = req.query.edit === 'true';

    Property.findById(propertyId).then(property => {
        if (!property) {
            return res.status(404).render('404', { pageTitle: 'Page Not Found' });
        }
        res.render('host/edit-property', {
            pageTitle: 'Edit Property',
            property,
            edit
        });
    });
});

// Edit property (POST)
hostRouter.post('/host/edit-property/:id', hostController.postEditProperty);

hostRouter.post('/host/delete-property/:id', hostController.deleteProperty);

module.exports = { hostRouter };