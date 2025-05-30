const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
	clientName: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'in_progress', 'delivered', 'cancelled'],
		default: 'pending'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}

});

module.exports = mongoose.model('Delivery', DeliverySchema);