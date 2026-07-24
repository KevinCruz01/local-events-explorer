import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
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

const EventMap = ({ events }) => {
    const defaultCenter = [20.58806, -100.38806];

    return (
        <MapContainer center={defaultCenter} zoom={13} style={{ height: '500px', width: '100%', borderRadius: '8px' }}>
            {/* 👇 Cambiamos el TileLayer por el servidor de CartoDB 👇 */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
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