const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // Importar el middleware
const { sql } = require('../models/database');

// Ruta para obtener todos los roles
router.get('/', authMiddleware, async (req, res) => {
  // Verificar que el usuario tenga el rol de administrador
  if (req.user.id_rol !== 1) { // Solo el administrador (id_rol = 1) tiene acceso
    return res.status(403).json({ error: 'Acceso denegado. Solo el administrador puede acceder.' });
  }

  try {
    const result = await sql.query('SELECT * FROM Roles');
    res.json(result.recordset); // Enviar los roles como JSON
  } catch (err) {
    res.status(500).send(`Error al obtener roles: ${err.message}`);
  }
});

module.exports = router;

