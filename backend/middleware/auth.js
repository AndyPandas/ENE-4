const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']; // Leer el token del encabezado
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, 'secreto_para_jwt'); // Cambia 'secreto_para_jwt' por tu clave
    req.user = decoded; // Guardar los datos del usuario en req.user
    next(); // Continuar con la ruta protegida
  } catch (err) {
    res.status(403).json({ error: 'Token inválido o expirado.' });
  }
}

module.exports = authMiddleware;
