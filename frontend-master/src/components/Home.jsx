import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css"; // Importar el CSS Module
import salaImg from '../img/ini.avif'; // Importar la imagen

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.header}>Bienvenido a ReserverRooms</h1>
        <p className={styles.paragraph}>Aquí puedes agendar tu Room.</p>
        <button
          className={styles.button}
          onClick={() => navigate("/Login")}
        >
          Comenzar
        </button>
      </div>

      <div className={styles.aboutContainer}>
        <div className={styles.aboutText}>
          <h2 className={styles.aboutHeader}>Acerca de Nosotros</h2>
          <p className={styles.aboutParagraph}>
            ReserverRooms es tu solución para encontrar el espacio perfecto para
            tus reuniones importantes, ya sean de carácter educativo,
            gubernamental o corporativo. Ofrecemos salas completamente equipadas
            para asegurar que tus eventos sean exitosos.
          </p>
        </div>
        <div className={styles.aboutImage}>
          <img
            src={salaImg} // Usando la imagen importada
            alt="Sala de reuniones"
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
