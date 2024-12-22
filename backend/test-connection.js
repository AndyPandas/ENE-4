const { connectDB } = require('./models/database');

const testConnection = async () => {
  try {
    await connectDB();
    console.log('¡Conexión exitosa!');
  } catch (err) {
    console.error('Error al conectar:', err.message);
  }
};

testConnection();
