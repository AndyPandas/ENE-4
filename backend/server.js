const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models/database');

const app = express();

// Middlewares globales
app.use(express.json()); // Procesar datos JSON
app.use(cors()); // Permitir solicitudes desde cualquier origen

// Conectar a la base de datos
connectDB();

// Importar rutas
const usuariosRoutes = require('./routes/usuarios'); // Ruta de usuarios

// Usar las rutas
app.use('/usuarios', usuariosRoutes); // Asignar rutas de usuarios al prefijo /usuarios

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// Iniciar el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
