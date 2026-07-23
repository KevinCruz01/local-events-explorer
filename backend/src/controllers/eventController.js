const EventModel = require('../models/eventModel');

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

module.exports = {
    addEvent,
    getEvents
};