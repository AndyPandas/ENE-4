const sql = require('mssql');

// Configuración de SQL Server
const dbConfig = {
  user: 'restaurante_user', // Nombre del usuario creado
  password: 'andypanda1.', // Contraseña asignada al usuario
  server: 'ANDYPANDA', // Nombre del servidor SQL
  database: 'RestauranteXXI', // Nombre de la base de datos
  options: {
    encrypt: false, // Desactiva si no usas HTTPS
    trustServerCertificate: true, // Evita errores de certificados
  },
};

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conexión exitosa a SQL Server');
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  }
};

module.exports = { connectDB, sql };
