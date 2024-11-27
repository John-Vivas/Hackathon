const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { 
        type: String, 
        required: [true, 'El correo es obligatorio'], 
        unique: true, 
        match: [/.+\@.+\..+/, 'Por favor, proporciona un correo válido'] 
    },
    password: { type: String, required: true },
    empresa: { type: String, required: true },
    telefono: { type: String },
    rol: { type: String, enum: ['admin', 'user'], default: 'user' }, // Nuevo campo role
    fecha_creacion: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Usuario', UsuarioSchema);
