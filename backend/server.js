const express = require('express');
const cors = require('cors');
const { connectDB } = require('./models/database'); // Conexión a la base de datos

const app = express();

// Middlewares
app.use(express.json()); // Para procesar JSON
app.use(cors()); // Habilitar CORS

// Conectar a la base de datos
connectDB();

// Importar rutas
const usuariosRoutes = require('./routes/usuarios'); // Importar rutas de usuarios

// Usar rutas
app.use('/usuarios', usuariosRoutes); // Registrar rutas de usuarios

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor corriendo correctamente');
});

// Iniciar el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
