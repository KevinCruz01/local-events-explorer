const EventModel = require('../models/eventModel');
const { sendReservationEmail } = require('../utils/mailer'); // Importamos el mailer

const addEvent = async (req, res) => {
    try {
        const newEvent = await EventModel.createEvent(req.body);
        res.status(201).json({
            status: 'success',
            data: newEvent
        });
    } catch (error) {
        console.error('Error en addEvent:', error.message);
        res.status(500).json({ error: 'Hubo un error al crear el evento' });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.getAllEvents();
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: events
        });
    } catch (error) {
        console.error('Error en getEvents:', error.message);
        res.status(500).json({ error: 'Hubo un error al obtener los eventos' });
    }
};

const reserveEvent = async (req, res) => {
    const { id } = req.params; // Obtenemos el ID del evento desde la URL
    const { email } = req.body; // Obtenemos el correo desde el cuerpo de la petición

    try {
        // 1. Buscamos que el evento realmente exista en la base de datos
        const event = await EventModel.getEventById(id);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        // 2. Disparamos el correo con el ticket (sin 'await' para no bloquear la respuesta)
        sendReservationEmail(event, email);

        // 3. Respondemos al frontend inmediatamente
        res.status(200).json({ 
            status: 'success', 
            message: 'Ticket generado y enviado con éxito' 
        });
    } catch (error) {
        console.error('Error en reserveEvent:', error.message);
        res.status(500).json({ error: 'Error procesando la reserva' });
    }
};

module.exports = {
    addEvent,
    getEvents,
    reserveEvent
};