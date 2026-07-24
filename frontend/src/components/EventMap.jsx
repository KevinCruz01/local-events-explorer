import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { reserveEventTicket } from '../services/api'; // Importamos la nueva función

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.flyTo(center, 15, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

const EventMap = ({ events, mapCenter }) => {
    const initialCenter = mapCenter || [20.58806, -100.38806];
    
    //  ESTADOS PARA EL FORMULARIO DEL POPUP 
    const [reservationEmail, setReservationEmail] = useState('');
    const [loadingId, setLoadingId] = useState(null);

    const handleReservation = async (eventId) => {
        if (!reservationEmail) return alert('Por favor ingresa un correo válido');
        
        setLoadingId(eventId); // Activamos estado de carga para el botón
        try {
            await reserveEventTicket(eventId, reservationEmail);
            alert('¡Ticket enviado! Revisa tu bandeja de entrada. ');
            setReservationEmail(''); // Limpiamos el input
        } catch (error) {
            alert('Hubo un error al procesar tu reserva.');
        } finally {
            setLoadingId(null); // Desactivamos la carga
        }
    };

    return (
        <MapContainer center={initialCenter} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            <MapController center={mapCenter} />

            {events.map((event) => (
                <Marker key={event.id} position={[event.lat, event.lng]}>
                    <Popup minWidth={260}>
                        <div className="text-center">
                            <strong className="text-primary d-block fs-6 mb-1">{event.title}</strong>
                            <span className="badge bg-secondary mb-2">{event.category}</span>
                            <p className="mb-2 small text-muted">{event.description}</p>
                            <p className="mb-3 fw-bold small"> {new Date(event.event_date).toLocaleDateString('es-MX')}</p>
                            
                            <hr className="my-2" />
                            
                            {/*  SECCIÓN DE RESERVA INTEGRADA EN EL MAPA  */}
                            <p className="small fw-bold mb-2 text-dark"> ¡Reserva tu lugar!</p>
                            <input 
                                type="email" 
                                className="form-control form-control-sm mb-2 text-center" 
                                placeholder="Tu correo electrónico" 
                                value={reservationEmail}
                                onChange={(e) => setReservationEmail(e.target.value)}
                            />
                            <button 
                                className="btn btn-sm btn-success w-100 fw-bold" 
                                onClick={() => handleReservation(event.id)}
                                disabled={loadingId === event.id} // Deshabilita el botón mientras envía
                            >
                                {loadingId === event.id ? 'Enviando Ticket...' : 'Obtener Ticket'}
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default EventMap;