const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    sala: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true }, // Referencia al modelo Sala
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // Referencia al usuario que hizo la reserva
    fecha: { type: Date, required: true },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
});

module.exports = mongoose.model('Reserva', ReservaSchema);
