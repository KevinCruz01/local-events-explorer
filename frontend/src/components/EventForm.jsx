import React, { useState } from 'react';
import { createEvent } from '../services/api';

const EventForm = ({ onEventAdded }) => {
    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Música',
        lat: '',
        lng: '',
        event_date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await createEvent(formData);
            if (result.status === 'success') {
                // Limpiamos el formulario
                setFormData({
                    title: '',
                    description: '',
                    category: 'Música',
                    lat: '',
                    lng: '',
                    event_date: ''
                });
                // Avisamos al componente padre (App.jsx) que hay un nuevo evento
                onEventAdded(result.data);
                alert('Evento creado con éxito 🎉');
            }
        } catch (error) {
            alert('Hubo un error al crear el evento');
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Agregar Nuevo Evento</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Título</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción</label>
                        <textarea className="form-control" name="description" rows="2" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Categoría</label>
                            <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                                <option value="Música">Música</option>
                                <option value="Educación">Educación</option>
                                <option value="Deportes">Deportes</option>
                                <option value="Cultura">Cultura</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Fecha del Evento</label>
                            <input type="datetime-local" className="form-control" name="event_date" value={formData.event_date} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">Latitud</label>
                            <input type="number" step="any" className="form-control" name="lat" value={formData.lat} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Longitud</label>
                            <input type="number" step="any" className="form-control" name="lng" value={formData.lng} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Guardar Evento</button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;