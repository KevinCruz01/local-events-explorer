const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Conexión a PostgreSQL establecida 🐘');
});

// Exportamos una función query para usarla de forma limpia en nuestros modelos
module.exports = {
    query: (text, params) => pool.query(text, params),
};