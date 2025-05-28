const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery'); //@

// Get all deliveries
router.get('/', async (req, res) => {
	try {
		const deliveries = await Delivery.find();
		res.json(deliveries);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// Create delivery
router.post('/', async (req, res) => {
	try {
		const delivery = await Delivery.create(req.body);
		res.status(201).json(delivery);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;