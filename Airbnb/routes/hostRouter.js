//External Modules
const express = require('express');
const hostRouter = express.Router();
//Custom Modules
const homesController = require('../controller/hostController');

hostRouter.get('/host/add-property', homesController.getAddProperty); 

hostRouter.post('/host/add-property', homesController.postAddProperty);
hostRouter.get('/host/hostHome-list', homesController.getHostProperties);
module.exports = { hostRouter };