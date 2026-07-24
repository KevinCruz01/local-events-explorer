import React, { useEffect, useState } from 'react';
import { getEvents } from './services/api';
import EventMap from './components/EventMap';

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

  return (
    <div className="container mt-5 mb-5">
      <h1 className="text-primary text-center mb-4">Explorador de Eventos Locales</h1>
      
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">Mapa de Eventos</h5>
        </div>
        <div className="card-body p-0">
          {/* Renderizamos el mapa y le pasamos el arreglo de eventos */}
          <EventMap events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;