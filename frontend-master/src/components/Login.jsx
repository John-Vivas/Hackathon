import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import styles from "../styles/login.module.css"; // Importando el archivo de estilos
import { Link } from "react-router-dom"; // Importar Link de react-router-dom para la navegación

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await apiClient.post("/usuarios/iniciarsesion", {
        correo: email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "usuario",
        JSON.stringify({ nombre: response.data.nombre })
      );
      navigate("/PageRooms"); 
    } catch (err) {
      if (err.response) {
        setError(err.response.data.mensaje || "Error al iniciar sesión");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className={`${styles.container} flex items-center justify-center h-screen bg-gray-100`}>
      <div className={`${styles.formContainer} bg-white p-8 rounded-lg shadow-lg w-96`}>
        <h2 className={`${styles.title} text-2xl font-bold text-gray-800 mb-4`}>
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${styles.input} w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${styles.input} w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          <button
            type="submit"
            className={`${styles.submitButton} w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600`}
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-center mt-4">
          ¿No te has registrado?{" "}
          <Link to="/Register" className="text-blue-500 hover:text-blue-700">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
