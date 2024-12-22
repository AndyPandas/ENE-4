const express = require('express');
const { sql } = require('../models/database');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, password, id_rol } = req.body;

  try {
    const pool = await sql.connect();

    // Verificar si el email ya existe
    const result = await pool
      .request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM Usuarios WHERE email = @email');

    if (result.recordset.length > 0) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    // Insertar el nuevo usuario
    const query = `
      INSERT INTO Usuarios (nombre, email, password, id_rol)
      VALUES (@nombre, @correo, @password, @id_rol)
    `;
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('correo', sql.VarChar, email)
      .input('password', sql.VarChar, password) // Contraseña en texto plano
      .input('id_rol', sql.Int, id_rol)
      .query(query);

    res.send('Usuario creado exitosamente');
  } catch (err) {
    res.status(500).send(`Error al crear usuario: ${err.message}`);
  }
});

module.exports = router;
