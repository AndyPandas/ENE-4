const sql = require('mssql');

// Configuración de la base de datos
const dbConfig = {
  user: 'restaurante_user', // Nombre del usuario creado
  password: 'andypanda1.', // Contraseña asignada al usuario
  server: 'ANDYPANDA', // Nombre del servidor SQL
  database: 'RestauranteXXI', // Nombre de la base de datos
  server: 'localhost', // Cambia si tu servidor tiene otro nombre
  options: {
    encrypt: false, // No encriptar conexión
    enableArithAbort: true,
  },
};

// Conectar a la base de datos
async function connectDB() {
  try {
    await sql.connect(dbConfig);
    console.log('Conexión exitosa a SQL Server');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  }
}

module.exports = { connectDB, sql };
