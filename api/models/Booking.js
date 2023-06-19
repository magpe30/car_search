const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    carMake: { type: String, required: true},
    carModel: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    numberOfDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;