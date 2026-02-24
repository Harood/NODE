//Core Modules
const path = require('path');

//Third Party Modules
const express = require('express');

//Custom Modules
const rootDir = require('../utils/pathutils');
const homesController = require('../controller/storeController');

const storeRouter = express.Router();

storeRouter.get('/', homesController.getAllProperties); 
storeRouter.get('/bookings', homesController.getAllBookings);
storeRouter.get('/favourite-list', homesController.getFavoriteProperties);
storeRouter.get('/homes/:propertyId', homesController.getPropertyDetails);

module.exports = storeRouter;