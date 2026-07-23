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

// Ruta de comprobación (Health Check)
app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'success',
        message: 'Servidor de Local Events Explorer funcionando 🚀' 
    });
});

// Inicialización del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});