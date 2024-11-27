import React from 'react';
import styles from '../styles/Rooms.module.css';

const Rooms = () => {
  const cardData = [
    {
      id: 1,
      title: 'Sala de Reuniones',
      image: require('../img/salas/sala9.png')
    },
    {
      id: 2,
      title: 'Oficina Privada',
      image: require('../img/salas/sala10.png')
    },
    {
      id: 3,
      title: 'Área de Co-working',
      image: require('../img/salas/sala11.png'),
    },
    {
      id: 4,
      title: 'Sala de Conferencias',
      image: require('../img/salas/sala12.png'),
    },
    {
      id: 5,
      title: 'Sala de Reuniones',
      image: require('../img/salas/sala14.png'),
    },
    {
      id: 6,
      title: 'Oficina Privada',
      image: require('../img/salas/sala15.png'),
    },
    {
      id: 7,
      title: 'Área de Co-working',
      image: require('../img/salas/sala16.png'),
    },
    {
      id: 8,
      title: 'Sala de Conferencias',
      image: require('../img/salas/sala17.png'),
    },
    {
      id: 9,
      title: 'Sala de Reuniones',
      image: require('../img/salas/sala18.png'),
    },
    {
      id: 10,
      title: 'Oficina Privada',
      image: require('../img/salas/sala19.png'),
    },
    {
      id: 11,
      title: 'Área de Co-working',
      image: require('../img/salas/sala20.png'),
    },
    {
      id: 12,
      title: 'Sala de Conferencias',
      image: require('../img/salas/sala21.png'),
    },
  ];

  return (
    <div className="w-full py-6">
      <h2 className="text-2xl font-bold text-center my-4">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 bg-white"
          >
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
              <button className={styles.reservarButton}>
                Reservar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
