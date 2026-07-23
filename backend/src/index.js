require('dotenv').config();

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();


// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir JSON en el cuerpo de las peticiones
app.use(morgan('dev'));  // Logger de desarrollo

// Importar rutas
const eventRoutes = require('./routes/eventRoutes');

// Usar rutas
app.use('/api/events', eventRoutes);

// Inicialización del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});