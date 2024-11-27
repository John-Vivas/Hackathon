const express = require('express');
const router = express.Router();
const controladorSala = require('../controladores/controladorSala');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion');
const autorizacionRol = require('../middleware/middlewareAutorizacion');

// Crear una nueva sala (solo admin)
router.post('/', 
  middlewareAutenticacion, 
  autorizacionRol(['admin']), 
  controladorSala.crearSala
);

// Obtener todas las salas (todos los usuarios autenticados)
router.get('/', 
  middlewareAutenticacion, 
  controladorSala.obtenerSalas
);

// Obtener una sala por ID (todos los usuarios autenticados)
router.get('/:id', 
  middlewareAutenticacion, 
  controladorSala.obtenerSalaPorId
);

// Actualizar una sala (solo admin)
router.put('/:id', 
  middlewareAutenticacion, 
  autorizacionRol(['admin']), 
  controladorSala.actualizarSala
);

// Eliminar una sala (solo admin)
router.delete('/:id', 
  middlewareAutenticacion, 
  autorizacionRol(['admin']), 
  controladorSala.eliminarSala
);

module.exports = router;