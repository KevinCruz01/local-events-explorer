const db = require('../config/db');

// Crear un nuevo evento
const createEvent = async (eventData) => {
    const { title, description, category, lat, lng, event_date } = eventData;
    
    // Usamos $1, $2, etc., para evitar inyecciones SQL (Consultas parametrizadas)
    const query = `
        INSERT INTO events (title, description, category, lat, lng, event_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
    `;
    const values = [title, description, category, lat, lng, event_date];
    
    const result = await db.query(query, values);
    return result.rows[0];
};

// Obtener todos los eventos
const getAllEvents = async () => {
    const query = 'SELECT * FROM events ORDER BY event_date ASC;';
    const result = await db.query(query);
    return result.rows;
};

// Agrega esta función debajo de las que ya tienes
const getEventById = async (id) => {
    const query = 'SELECT * FROM events WHERE id = $1;';
    const result = await db.query(query, [id]);
    return result.rows[0];
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById
};