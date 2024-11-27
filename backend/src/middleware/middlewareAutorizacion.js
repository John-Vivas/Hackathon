const autorizacionRol = (rolesPermitidos) => {
    return (req, res, next) => {
      // Verificar si el usuario está autenticado (el middleware de autenticación ya lo habrá hecho)
      if (!req.user) {
        return res.status(401).json({ mensaje: 'No autenticado' });
      }
  
      // Verificar si el rol del usuario está en los roles permitidos
      if (!rolesPermitidos.includes(req.user.rol)) {
        return res.status(403).json({ mensaje: 'Acceso denegado' });
      }
  
      next();
    };
  };
  
  module.exports = autorizacionRol;