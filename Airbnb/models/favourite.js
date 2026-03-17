const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }
});


module.exports = mongoose.model('Favourite', favouriteSchema);