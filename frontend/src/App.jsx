import React, { useEffect, useState } from 'react';
import { getEvents } from './services/api';
import EventMap from './components/EventMap';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

function App() {
  const [events, setEvents] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);

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

  const handleEventAdded = (newEvent) => {
    setEvents([...events, newEvent]);
    setMapCenter([newEvent.lat, newEvent.lng]);
  };

  const handleEventSelection = (event) => {
      setMapCenter([event.lat, event.lng]);
  };

  return (
    <div className="bg-light" style={{ minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* Barra de Navegación Superior */}
      <nav className="navbar navbar-dark bg-dark shadow-sm mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h4 fw-bold">
            📍 Explorador de Eventos
          </span>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* Columna Izquierda: Formulario y Lista */}
          <div className="col-lg-4">
            <EventForm onEventAdded={handleEventAdded} />
            <EventList events={events} onSelectEvent={handleEventSelection} />
          </div>
          
          {/* Columna Derecha: Mapa */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-header bg-white border-0 pt-4 pb-2 px-4">
                <h5 className="fw-bold text-dark mb-0">Mapa Interactivo</h5>
              </div>
              <div className="card-body p-0">
                <EventMap events={events} mapCenter={mapCenter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;