const express = require('express');
const { sql } = require('../models/database'); // Importar conexión a la base de datos

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect(); // Conectar a la base de datos
    const result = await pool.query('SELECT * FROM Usuarios'); // Consultar tabla Usuarios
    res.json(result.recordset); // Devolver datos en formato JSON
  } catch (err) {
    res.status(500).send(`Error al obtener usuarios: ${err.message}`);
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { nombre, email, password, id_rol } = req.body;

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, password)
      .input('id_rol', sql.Int, id_rol)
      .query('INSERT INTO Usuarios (nombre, email, password, id_rol) VALUES (@nombre, @email, @password, @id_rol)');
    res.send('Usuario creado exitosamente');
  } catch (err) {
    res.status(500).send(`Error al crear usuario: ${err.message}`);
  }
});

module.exports = router; // Exportar el enrutador
