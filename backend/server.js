const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models/database');

// Inicializar aplicación
const app = express();

// Middleware
app.use(express.json()); // Procesar JSON
app.use(cors()); // Permitir CORS

// Conectar a la base de datos
connectDB();

// Rutas
const usuariosRoutes = require('./routes/usuarios');
const pedidosRoutes = require('./routes/pedidos');

app.use('/usuarios', usuariosRoutes);
app.use('/pedidos', pedidosRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// Iniciar servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
