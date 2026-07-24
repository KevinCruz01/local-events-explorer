import React, { useEffect, useState } from 'react';
import { getEvents } from './services/api';
import EventMap from './components/EventMap';
import EventForm from './components/EventForm';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        if (data.status === 'success') {
          setEvents(data.data);
        }
      } catch (error) {
        console.error("No se pudieron cargar los eventos");
      }
    };
    fetchEvents();
  }, []);

  // Función para agregar el nuevo evento al estado actual
  const handleEventAdded = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-primary text-center mb-4">Explorador de Eventos Locales</h1>
      
      <div className="row">
        {/* Columna del Formulario (ocupa 4 de 12 espacios) */}
        <div className="col-lg-4">
          <EventForm onEventAdded={handleEventAdded} />
        </div>
        
        {/* Columna del Mapa (ocupa 8 de 12 espacios) */}
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">Mapa de Eventos</h5>
            </div>
            <div className="card-body p-0">
              <EventMap events={events} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;