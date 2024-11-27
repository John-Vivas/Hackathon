const express = require('express');
const router = express.Router();
const controladorReserva = require('../controladores/controladorReserva');
const middlewareAutenticacion = require('../middleware/middlewareAutenticacion');
const autorizacionRol = require('../middleware/middlewareAutorizacion');

// Crear una reserva (usuarios autenticados)
router.post('/', middlewareAutenticacion, controladorReserva.crearReserva);

// Obtener todas las reservas (admin puede ver todas, usuarios solo las suyas)
router.get('/', 
  middlewareAutenticacion, 
  controladorReserva.obtenerReservas
);

// Obtener una reserva por ID
router.get('/:id', middlewareAutenticacion, controladorReserva.obtenerReservaPorId);

// Actualizar estado de una reserva (solo admin)
router.put('/:id', 
  middlewareAutenticacion, 
  autorizacionRol(['admin']), 
  controladorReserva.actualizarEstadoReserva
);

// Eliminar una reserva (usuarios eliminan las suyas, admin elimina cualquiera)
router.delete('/:id', middlewareAutenticacion, controladorReserva.eliminarReserva);

module.exports = router;