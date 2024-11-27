import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Header.module.css";
import logo from '../img/logito.png';

const Header = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>ReserveRooms</h1>
        </div>
        <div className={styles.navLinks}>
          {location.pathname === "/Rooms" && usuario ? (
            <>
              <div className={styles.userInfo}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                <span>{usuario.nombre}</span>
              </div>
              <button
                onClick={handleLogout}
                className={styles.logoutButton}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              {location.pathname !== "/login" && location.pathname !== "/register" && (
                <Link to="/login" className={styles.navLink}>
                  Iniciar sesión
                </Link>
              )}
              
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
