const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    houseName: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    photoUrl: { type: String, required: true },
    rating: { type: Number, required: true }
});

homeSchema.pre('findOneAndDelete', async function() {
    const propertyId = this.getQuery()['_id'];
    try {
        await mongoose.model('Favourite').deleteMany({ propertyId: propertyId });
    } catch (err) {
        console.error('Error deleting favourites:', err);
    }
});


module.exports = mongoose.model('Property', homeSchema);