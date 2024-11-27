const mongoose = require("mongoose");
const Reserva = require("../modelos/reserva");
const Sala = require("../modelos/sala");
const Usuario = require("../modelos/usuario");

// Crear una reserva
exports.crearReserva = async (req, res) => {
  const { sala, fecha, horaInicio, horaFin } = req.body;

  try {
    // Verificar que la sala exista
    const salaExistente = await Sala.findById(sala);
    if (!salaExistente) {
      return res.status(404).json({ mensaje: "Sala no encontrada" });
    }

    // Verificar conflictos de horario
    const conflictos = await Reserva.find({
      sala,
      fecha,
      $or: [
        { horaInicio: { $lt: new Date(horaFin), $gte: new Date(horaInicio) } },
        { horaFin: { $gt: new Date(horaInicio), $lte: new Date(horaFin) } },
      ],
    });

    if (conflictos.length > 0) {
      return res.status(400).json({ mensaje: "Conflicto de horario para la sala seleccionada" });
    }

    // Crear la reserva
    const nuevaReserva = new Reserva({
      sala,
      usuario: req.user.id, // ID del usuario autenticado
      fecha,
      horaInicio,
      horaFin,
    });

    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json({
      mensaje: "Reserva creada exitosamente",
      reserva: reservaGuardada,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la reserva", error: error.message });
  }
};

// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
  const { sala, usuario, estado, fecha } = req.query;

  const filtro = {};
  // Si es admin, puede ver todas las reservas
  if (req.user.rol === 'admin') {
    if (sala) filtro.sala = sala;
    if (usuario) filtro.usuario = usuario;
    if (estado) filtro.estado = estado;
    if (fecha) filtro.fecha = fecha;
  } else {
    // Si es usuario normal, solo ve sus propias reservas
    filtro.usuario = req.user.id;
  }

  try {
    const reservas = await Reserva.find(filtro)
      .populate("sala", "nombre")
      .populate("usuario", "nombre correo");
    res.status(200).json({ mensaje: "Reservas obtenidas exitosamente", reservas });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las reservas", error: error.message });
  }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findById(id)
      .populate("sala", "nombre")
      .populate("usuario", "nombre correo");
    
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    // Si no es admin, solo puede ver su propia reserva
    if (req.user.rol !== 'admin' && reserva.usuario._id.toString() !== req.user.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para ver esta reserva" });
    }

    res.status(200).json({ mensaje: "Reserva obtenida exitosamente", reserva });
  } catch (error) {
    res.status(500).json({ 
      mensaje: "Error al obtener la reserva", 
      error: error.message 
    });
  }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la reserva primero
    const reservaExistente = await Reserva.findById(id);
    
    if (!reservaExistente) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }

    // Si no es admin, solo puede eliminar sus propias reservas
    if (req.user.rol !== 'admin' && reservaExistente.usuario.toString() !== req.user.id) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar esta reserva" });
    }

    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    res.status(200).json({
      mensaje: "Reserva eliminada exitosamente",
      reserva: reservaEliminada,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la reserva", error: error.message });
  }
};

// Actualizar estado de reserva (solo admin)
exports.actualizarEstadoReserva = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const reserva = await Reserva.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    if (!reserva) {
      return res.status(404).json({ mensaje: "Reserva no encontrada" });
    }
    res.status(200).json({ mensaje: "Estado actualizado exitosamente", reserva });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el estado", error: error.message });
  }
};