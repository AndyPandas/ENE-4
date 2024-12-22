const express = require('express');
const jwt = require('jsonwebtoken');
const { sql } = require('../models/database');

const router = express.Router();

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por email
    const pool = await sql.connect();
    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Usuarios WHERE email = @email');

    const user = result.recordset[0];
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña (texto plano)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id_usuario: user.id_usuario, id_rol: user.id_rol },
      'secreto_para_jwt', // Cambia esto por una clave más segura en producción
      { expiresIn: '1h' }
    );

    res.json({ token, id_rol: user.id_rol });
  } catch (err) {
    res.status(500).send(`Error en el login: ${err.message}`);
  }
});

module.exports = router;
