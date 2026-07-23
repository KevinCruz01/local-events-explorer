const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Definimos los endpoints para la ruta /api/events
router.post('/', eventController.addEvent);
router.get('/', eventController.getEvents);

module.exports = router;