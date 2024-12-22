const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']; // Leer el token desde el encabezado
  const token = authHeader && authHeader.split(' ')[1]; // Formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, 'secreto_para_jwt'); // Cambia 'secreto_para_jwt' por una clave más segura
    req.user = decoded; // Guardar los datos del usuario en el objeto `req`
    next(); // Pasar al siguiente middleware o controlador
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}

module.exports = authMiddleware;
