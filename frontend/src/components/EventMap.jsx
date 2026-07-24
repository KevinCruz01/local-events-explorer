import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// 👇 NUEVO: Subcomponente para mover la cámara del mapa
const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            // flyTo hace una animación suave hacia las nuevas coordenadas
            map.flyTo(center, 15, { duration: 1.5 });
        }
    }, [center, map]);
    return null;
};

// Modificamos las props para recibir el centro dinámico
const EventMap = ({ events, mapCenter }) => {
    // Si no hay un centro seleccionado, mostramos Querétaro por defecto
    const defaultCenter = [20.58806, -100.38806];
    const initialCenter = mapCenter || defaultCenter;

    return (
        <MapContainer center={initialCenter} zoom={13} style={{ height: '500px', width: '100%', borderRadius: '8px' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Componente que escucha los cambios en la propiedad mapCenter */}
            <MapController center={mapCenter} />

            {events.map((event) => (
                <Marker key={event.id} position={[event.lat, event.lng]}>
                    <Popup>
                        <strong className="text-primary">{event.title}</strong><br />
                        <span className="badge bg-secondary mb-1">{event.category}</span><br />
                        {new Date(event.event_date).toLocaleDateString()}<br />
                        <small className="text-muted">{event.description}</small>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default EventMap;