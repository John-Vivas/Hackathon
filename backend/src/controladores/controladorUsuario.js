const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require("../modelos/usuario");

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
    const { nombre, correo, password, empresa, telefono, rol } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const nuevoUsuario = new Usuario({
        nombre,
        correo,
        password: hashedPassword,
        empresa,
        telefono,
        rol: rol || "cliente",
      });
      const usuarioGuardado = await nuevoUsuario.save();
      res.status(201).json({ mensaje: "Usuario registrado", usuario: usuarioGuardado });
    } catch (error) {
        return res.status(500).json({ mensaje: "Error al crear el usuario", error: error.message });
    }
  };
  
  // Iniciar sesión
  exports.iniciarSesion = async (req, res) => {
    const { correo, password } = req.body;
    try {
      const usuario = await Usuario.findOne({ correo });
  
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      const esValida = await bcrypt.compare(password, usuario.password);
      if (!esValida) {
        return res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign(
        { id: usuario._id, rol: usuario.rol }, // Incluir el rol en el token
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ mensaje: "Inicio de sesión exitoso", token });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al iniciar sesión", error: error.message });
    }
  };
  
  // Obtener perfil de usuario
  exports.obtenerPerfilUsuario = async (req, res) => {
    // Código de la función
    try {
      const usuario = await Usuario.findById(req.user.id, "-password");
      if (!usuario) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
      res.status(200).json({ usuario });
    } catch (error) {
      res.status(500).json({
        mensaje: "Error al obtener el perfil del usuario",
        error: error.message,
      });
    }
  };
  
  // Actualizar perfil de usuario
  exports.actualizarPerfilUsuario = async (req, res) => {
    const { nombre, correo, empresa, telefono, rol } = req.body;
    try {
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.user.id,
        { nombre, correo, empresa, telefono, rol },
        { new: true, runValidators: true }
      );
  
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }
  
      res
        .status(200)
        .json({ mensaje: "Perfil actualizado", usuario: usuarioActualizado });
    } catch (error) {
      res
        .status(500)
        .json({ mensaje: "Error al actualizar el perfil", error: error.message });
    }
  };