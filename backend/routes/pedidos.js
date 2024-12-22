const express = require('express');
const { sql } = require('../models/database');

const router = express.Router();

// Ruta para obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pool = await sql.connect();
    const result = await pool.query('SELECT * FROM Pedidos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(`Error al obtener pedidos: ${err.message}`);
  }
});

// Ruta para crear un nuevo pedido
router.post('/', async (req, res) => {
  const { id_usuario, estado } = req.body;

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id_usuario', sql.Int, id_usuario)
      .input('estado', sql.VarChar, estado)
      .query('INSERT INTO Pedidos (id_usuario, estado) VALUES (@id_usuario, @estado)');
    res.send('Pedido creado exitosamente');
  } catch (err) {
    res.status(500).send(`Error al crear pedido: ${err.message}`);
  }
});

// Ruta para actualizar un pedido
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id', sql.Int, id)
      .input('estado', sql.VarChar, estado)
      .query('UPDATE Pedidos SET estado = @estado WHERE id_pedido = @id');
    res.send('Pedido actualizado exitosamente');
  } catch (err) {
    res.status(500).send(`Error al actualizar pedido: ${err.message}`);
  }
});

// Ruta para eliminar un pedido
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Pedidos WHERE id_pedido = @id');
    res.send('Pedido eliminado exitosamente');
  } catch (err) {
    res.status(500).send(`Error al eliminar pedido: ${err.message}`);
  }
});

module.exports = router;
