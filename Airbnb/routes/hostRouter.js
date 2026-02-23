//External Modules
const express = require('express');
const hostRouter = express.Router();
//Custom Modules
const homesController = require('../controller/storeController');

hostRouter.get('/host/add-property', homesController.getAddProperty); 

hostRouter.post('/host/add-property', homesController.postAddProperty);

module.exports = { hostRouter };