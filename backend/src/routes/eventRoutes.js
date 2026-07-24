const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.post('/', eventController.addEvent);
router.get('/', eventController.getEvents);

// Usamos :id como parámetro dinámico para saber qué evento se está reservando
router.post('/:id/reserve', eventController.reserveEvent);

module.exports = router;