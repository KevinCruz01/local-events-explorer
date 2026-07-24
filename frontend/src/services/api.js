import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api/events';

export const getEvents = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error obteniendo los eventos:', error);
        throw error;
    }
};

export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(API_URL, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creando el evento:', error);
        throw error;
    }
};

export const reserveEventTicket = async (eventId, email) => {
    try {
        // Hacemos el POST a la URL dinámica del evento enviando el email en el body
        const response = await axios.post(`${API_URL}/${eventId}/reserve`, { email });
        return response.data;
    } catch (error) {
        console.error('Error reservando ticket:', error);
        throw error;
    }
};