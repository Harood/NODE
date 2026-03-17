// External Modules
const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controller/hostController');

// Add property (GET)
hostRouter.get('/host/add-property', hostController.getAddProperty);

// Add property (POST)
hostRouter.post('/host/add-property', hostController.postAddProperty);

// List all host properties
hostRouter.get('/host/hostHome-list', hostController.getHostProperties);

// Edit property (GET)
hostRouter.get('/host/edit-property/:id', hostController.getEditProperty);

// Edit property (POST)
hostRouter.post('/host/edit-property/:id', hostController.postEditProperty);

hostRouter.post('/host/delete-property/:id', hostController.deleteProperty);

module.exports = { hostRouter };