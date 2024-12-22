const express = require('express');
const { sql } = require('../models/database');
const { validarRol } = require('../middleware/roles');

const router = express.Router();

// Obtener todos los pedidos (Administrador y Cocina)
router.get('/', validarRol, async (req, res) => {
  if (![1, 2].includes(req.id_rol)) { // Solo Administrador (1) y Cocina (2)
    return res.status(403).json({ error: 'No tienes permisos para ver los pedidos' });
  }

  try {
    const pool = await sql.connect();
    const result = await pool.query('SELECT * FROM Pedidos');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: `Error al obtener pedidos: ${err.message}` });
  }
});

// Crear un pedido (Solo Clientes)
router.post('/', validarRol, async (req, res) => {
  if (req.id_rol !== 3) { // Solo Cliente (id_rol = 3)
    return res.status(403).json({ error: 'Solo los clientes pueden crear pedidos' });
  }

  const { id_usuario, estado } = req.body;

  try {
    const pool = await sql.connect();
    await pool.request()
      .input('id_usuario', sql.Int, id_usuario)
      .input('estado', sql.VarChar, estado)
      .query('INSERT INTO Pedidos (id_usuario, estado) VALUES (@id_usuario, @estado)');
    res.json({ message: 'Pedido creado exitosamente' });
  } catch (err) {
    if (err.message.includes('FOREIGN KEY constraint')) {
      res.status(400).json({ error: 'El ID del usuario no es válido o no existe en la tabla Usuarios.' });
    } else {
      res.status(500).json({ error: `Error al crear pedido: ${err.message}` });
    }
  }
});

// Modificar un pedido (Administrador y Cocina)
router.put('/:id', validarRol, async (req, res) => {
  if (![1, 2].includes(req.id_rol)) { // Solo Administrador (1) y Cocina (2)
    return res.status(403).json({ error: 'No tienes permisos para modificar pedidos' });
  }

  const { id } = req.params;
  const { estado } = req.body;

  try {
    const pool = await sql.connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('estado', sql.VarChar, estado)
      .query('UPDATE Pedidos SET estado = @estado WHERE id_pedido = @id');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    // Devolver pedido actualizado
    const pedidoActualizado = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Pedidos WHERE id_pedido = @id');
    res.json({ message: 'Pedido actualizado exitosamente', pedido: pedidoActualizado.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: `Error al modificar pedido: ${err.message}` });
  }
});


// Eliminar un pedido (Solo Administrador)
router.delete('/:id', validarRol, async (req, res) => {
  if (req.id_rol !== 1) { // Solo Administrador (1)
    return res.status(403).json({ error: 'No tienes permisos para eliminar pedidos' });
  }

  const { id } = req.params;

  try {
    const pool = await sql.connect();
    const pedidoExistente = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Pedidos WHERE id_pedido = @id');

    if (pedidoExistente.recordset.length === 0) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Pedidos WHERE id_pedido = @id');

    res.json({ message: 'Pedido eliminado exitosamente', pedido: pedidoExistente.recordset[0] });
  } catch (err) {
    res.status(500).json({ error: `Error al eliminar pedido: ${err.message}` });
  }
});


module.exports = router;
