const express = require('express');
const { sql } = require('../models/database');

const router = express.Router();

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool.query('SELECT * FROM Pedidos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: `Error al obtener pedidos: ${err.message}` });
  }
});

// Crear un pedido
router.post('/', async (req, res) => {
  const { id_usuario, estado } = req.body;
  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id_usuario', sql.Int, id_usuario)
      .input('estado', sql.VarChar, estado)
      .query('INSERT INTO Pedidos (id_usuario, estado) VALUES (@id_usuario, @estado)');
    res.json({ message: 'Pedido creado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: `Error al crear pedido: ${err.message}` });
  }
});

// Eliminar un pedido
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Pedidos WHERE id_pedido = @id');
    res.json({ message: 'Pedido eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: `Error al eliminar pedido: ${err.message}` });
  }
});

module.exports = router;
