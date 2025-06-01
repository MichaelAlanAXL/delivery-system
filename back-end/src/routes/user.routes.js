const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'User or password incorrect' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Pegar dados usuario logado
router.get('/me', async (req, res) => {
  try {
    const user = await User.findOne({ name: 'Admin' });

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json({ name: user.name });

  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error });

  }
});

module.exports = router;
