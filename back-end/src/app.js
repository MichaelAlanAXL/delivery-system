const express = require('express');
const cors = require('cors');
const deliveryRoutes = require('./routes/delivery.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/deliveries', deliveryRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API is running ✅');
});

module.exports = app;
