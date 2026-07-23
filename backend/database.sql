-- Ejecuta esto primero para crear la base de datos (si usas postgres local)
CREATE DATABASE local_events_db;

-- Conéctate a la base de datos local_events_db y ejecuta la creación de la tabla:
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    lat DECIMAL(10, 8) NOT NULL,   -- Latitud para el mapa
    lng DECIMAL(11, 8) NOT NULL,   -- Longitud para el mapa
    event_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);