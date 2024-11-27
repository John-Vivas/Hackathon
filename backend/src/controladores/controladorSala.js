const mongoose = require("mongoose");
const Sala = require('../modelos/sala'); // Modelo de Sala

// Crear una nueva sala
exports.crearSala = async (req, res) => {
    const { nombre, capacidad, ubicacion, descripcion } = req.body;

    try {
        const nuevaSala = new Sala({
            nombre,
            capacidad,
            ubicacion,
            descripcion,
        });

        const salaGuardada = await nuevaSala.save();
        res.status(201).json({ mensaje: 'Sala creada exitosamente', sala: salaGuardada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la sala', error: error.message });
    }
};

// Obtener todas las salas
exports.obtenerSalas = async (req, res) => {
    try {
        const salas = await Sala.find();
        res.status(200).json({ mensaje: 'Salas obtenidas exitosamente', salas });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las salas', error: error.message });
    }
};

// Obtener una sala por ID
exports.obtenerSalaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const sala = await Sala.findById(id);
        if (!sala) {
            return res.status(404).json({ mensaje: 'Sala no encontrada' });
        }
        res.status(200).json({ mensaje: 'Sala obtenida exitosamente', sala });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la sala', error: error.message });
    }
};

// Actualizar una sala
exports.actualizarSala = async (req, res) => {
    const { id } = req.params;
    const { nombre, capacidad, ubicacion, descripcion } = req.body;

    try {
        const salaActualizada = await Sala.findByIdAndUpdate(
            id,
            { nombre, capacidad, ubicacion, descripcion },
            { new: true, runValidators: true }
        );

        if (!salaActualizada) {
            return res.status(404).json({ mensaje: 'Sala no encontrada' });
        }
        res.status(200).json({ mensaje: 'Sala actualizada exitosamente', sala: salaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la sala', error: error.message });
    }
};

// Eliminar una sala
exports.eliminarSala = async (req, res) => {
    const { id } = req.params;

    try {
        const salaEliminada = await Sala.findByIdAndDelete(id);
        if (!salaEliminada) {
            return res.status(404).json({ mensaje: 'Sala no encontrada' });
        }
        res.status(200).json({ mensaje: 'Sala eliminada exitosamente', sala: salaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la sala', error: error.message });
    }
};
