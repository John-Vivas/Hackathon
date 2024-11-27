import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);

  const availableDates = [
    '2024-11-28',
    '2024-11-30',
    '2024-12-02',
  ]; // Fechas disponibles para reservas (en formato ISO).

  const roomData = {
    '2024-11-28': [
      { room: 'Sala Reuniones', times: ['10:00 - 12:00', '14:00 - 16:00'] },
      { room: 'Sala de Juegos', times: ['09:00 - 11:00', '13:00 - 15:00'] },
    ],
    '2024-11-30': [
      { room: 'Sala tech', times: ['11:00 - 13:00', '15:00 - 17:00'] },
      { room: 'Sala super Computadoras', times: ['10:00 - 12:00', '16:00 - 18:00'] },
    ],
    '2024-12-02': [
      { room: 'Auditorio 1', times: ['09:00 - 11:00', '13:00 - 15:00'] },
      { room: 'Auditorio 2', times: ['12:00 - 14:00', '16:00 - 18:00'] },
    ],
  };

  // Función para manejar el cambio de fecha
  const handleDateChange = (date) => {
    setSelectedDate(date);

    const dateString = date.toISOString().split('T')[0];
    setAvailableRooms(roomData[dateString] || []); // Actualiza las salas según la fecha seleccionada
  };

  // Función para deshabilitar días pasados
  const tileDisable = ({ date, view }) => {
    if (view === 'month') {
      return date < new Date();
    }
    return false;
  };

  // Función para destacar fechas disponibles
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (availableDates.includes(dateString)) {
        return 'bg-green-200 text-green-800 font-bold'; // Clases de Tailwind
      }
    }
    return null;
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold text-center mb-4">Selecciona una fecha</h2>
      <div className="flex justify-center">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          tileDisabled={tileDisable}
          tileClassName={tileClassName}
        />
      </div>
      <p className="mt-4 text-center">
        Fecha seleccionada:{' '}
        <span className="font-bold text-blue-500">
          {selectedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-center">Salas disponibles:</h3>
        {availableRooms.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {availableRooms.map((room, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded shadow">
                <p className="font-bold">{room.room}</p>
                <p>Horarios: {room.times.join(', ')}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-center text-gray-500">No hay salas disponibles para esta fecha.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarComponent;
