const express = require('express');
const { sql } = require('../models/database');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool.query('SELECT * FROM Usuarios');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: `Error al obtener usuarios: ${err.message}` });
  }
});

module.exports = router;
