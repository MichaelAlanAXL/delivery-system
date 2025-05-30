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

// Update status of a delivery
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Verifica se o status está dentro dos valores válidos do enum
  const validStatuses = ['pending', 'in_progress', 'delivered', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status inválido' });
  }

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ error: 'Entrega não encontrada' });
    }

    res.json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new delivery POST
router.post('/new-delivery', async (req, res) => {
  try {
    const { clientName, address } = req.body;

    const newDelivery = await Delivery.create({
      clientName,
      address,
    });

    res.status(201).json(newDelivery);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar entrega', error });
  }
})

module.exports = router;