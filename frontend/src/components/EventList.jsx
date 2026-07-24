import React from 'react';

const EventList = ({ events, onSelectEvent }) => {
    // Si no hay eventos, mostramos un selector deshabilitado
    if (events.length === 0) {
        return (
            <select className="form-select bg-light border-0 text-muted" disabled>
                <option>Aún no hay eventos registrados...</option>
            </select>
        );
    }

    const handleChange = (e) => {
        // Obtenemos el ID del evento seleccionado y lo buscamos en el arreglo
        const selectedId = parseInt(e.target.value);
        const selectedEvent = events.find(ev => ev.id === selectedId);
        if (selectedEvent) {
            onSelectEvent(selectedEvent);
        }
    };

    return (
        <select 
            className="form-select bg-light border-0 fw-bold text-primary shadow-sm" 
            onChange={handleChange} 
            defaultValue=""
        >
            <option value="" disabled>📍 Buscar y enfocar un evento...</option>
            {events.map((event) => (
                <option key={event.id} value={event.id}>
                    {event.title} ({event.category})
                </option>
            ))}
        </select>
    );
};

export default EventList;