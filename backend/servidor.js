const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conectarBDMongo = require('./src/configuracion/baseDatos'); // MongoDB
const middlewareAutenticacion = require('./src/middleware/middlewareAutenticacion');

// Configuración del entorno
dotenv.config();

const app = express();

// Middlewares para parsear JSON
app.use(express.json());

//Configuracion especifica de CORS
app.use(cors({
    origin: 'http://localhost:3000', //Permitir solicitudes solo desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"], //permite solicitudes solo desde el frontend
    credentials: true,
}));

// Conexión a MongoDB
conectarBDMongo();


// Rutas
app.use('/api/usuarios', require('./src/rutas/rutasUsuario'));
app.use('/api/salas', require('./src/rutas/rutasSala'))
app.use('/api/reservas', require('./src/rutas/rutasReserva'))


// Ruta protegida (perfil del usuario)
app.get('/api/usuarios/perfil', middlewareAutenticacion, (req, res) => {
    res.status(200).json({ mensaje: 'Perfil de usuario', usuario: req.user });
});

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// Middleware para manejo de errores
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});