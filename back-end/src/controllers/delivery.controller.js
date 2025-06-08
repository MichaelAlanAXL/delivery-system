const Delivery = require('../models/Delivery');
const mongoose = require('mongoose');

exports.searchDeliveries = async (req, res) => {
	const { q } = req.query;

	if (!q) {
		return res.status(400).json({ message: 'Parâmetro de busca não informado' });
	}

	try {
		const regex = new RegExp(q, 'i');

		const conditions = [
			{ clientName: regex },
			{ address: regex },
			{ status: regex },
		];

		if (mongoose.Types.ObjectId.isValid(q)) {
			conditions.push({ _id: q });
		}

		const results = await Delivery.find({
			$or: conditions,
		});

		res.json(results);

	} catch (error) {
		console.error('Erro ao buscar entregas:', error);
		res.status(500).json({ message: 'Erro ao buscar entregas' });
	}
};