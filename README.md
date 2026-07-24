# Explorador de Eventos Locales

Una plataforma web interactiva diseñada para descubrir, registrar y localizar eventos en la ciudad. Desarrollada con una arquitectura MVC estructurada en el backend y una interfaz tipo panel de administración (dashboard) en el frontend, que permite la visualización geoespacial dinámica y la emisión de tickets virtuales automatizados.

## Tecnologías Utilizadas

**Frontend:**
* React + Vite (Entorno de desarrollo de alto rendimiento)
* Bootstrap 5 (Sistema de diseño mediante componentes responsivos y clases utilitarias)
* React Leaflet (Integración de mapas interactivos con CartoDB y control de cámara dinámico)
* Axios (Cliente HTTP para el consumo eficiente de la API REST)

**Backend:**
* Node.js + Express (Servidor estructurado y enrutamiento ágil)
* PostgreSQL + pg (Persistencia de datos y consultas relacionales)
* Nodemailer (Automatización de correos transaccionales)
* Arquitectura MVC (Separación lógica en Modelos, Vistas y Controladores)

## Características Principales

* **Mapa Interactivo Geoespacial:** Visualización de eventos mediante marcadores personalizados, utilizando mapas base optimizados y animaciones de cámara dinámicas que guían al usuario por la ciudad.
* **Panel de Gestión Centralizado:** Interfaz fluida para el registro ágil de nuevos eventos, permitiendo la clasificación por categorías (Cultura, Deportes, Música, Educación) e ingreso de coordenadas exactas.
* **Búsqueda y Enfoque Dinámico:** Sistema de selección rápida mediante un menú desplegable que localiza y centra automáticamente la cámara del mapa en el punto de interés deseado.
* **Sistema de Reserva Automatizado:** Generación de tickets virtuales con códigos alfanuméricos únicos, enviados instantáneamente a la bandeja de entrada del usuario mediante notificaciones por correo electrónico con diseño HTML.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado en tu sistema:
* Node.js (v18 o superior)
* PostgreSQL (Servicio corriendo localmente)
* Git

---

## Instalación y Configuración Local

Sigue estrictamente estos comandos para levantar el proyecto completo en tu máquina local.

### 1. Clonar el repositorio y configurar la Base de Datos

Abre tu terminal y descarga el código fuente:

    git clone https://github.com/KevinCruz01/local-events-explorer.git
    cd local-events-explorer

Abre tu herramienta de gestión de PostgreSQL (pgAdmin o psql), crea una base de datos y ejecuta este script para crear la tabla necesaria:

    CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT,
        category VARCHAR(50),
        lat NUMERIC(10, 8) NOT NULL,
        lng NUMERIC(11, 8) NOT NULL,
        event_date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

### 2. Configurar y levantar el Backend (Servidor)

En la misma terminal, ingresa a la carpeta del backend, instala las dependencias y crea tu archivo de entorno:

    cd backend
    npm install

Crea un archivo llamado .env dentro de la carpeta backend con tus credenciales:

    DB_USER=tu_usuario_postgres
    DB_PASSWORD=tu_contraseña_postgres
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=nombre_de_tu_base_de_datos
    EMAIL_USER=tu_correo@gmail.com
    EMAIL_PASS=tu_contraseña_de_aplicacion_google

Levanta el servidor (se ejecutará en el puerto 5000):

    npm run dev

### 3. Configurar y levantar el Frontend (Interfaz)

Abre una NUEVA pestaña o ventana de terminal (deja el backend corriendo en la anterior) y ejecuta los siguientes comandos desde la raíz de tu proyecto:

    cd frontend
    npm install
    npm run dev

### 4. ¡A explorar!

Una vez que ambos servidores (Node.js y Vite) estén corriendo, abre tu navegador web y visita la aplicación en: http://localhost:5173

---

## Uso de la Aplicación

1. **Crear un evento:** Llena el formulario lateral con los detalles del evento y coordenadas geográficas válidas.
2. **Explorar el mapa:** Usa el menú desplegable superior para buscar un evento. El mapa realizará un vuelo automático (flyTo) hacia allí.
3. **Generar un ticket:** Haz clic sobre el marcador azul en el mapa. Ingresa tu correo electrónico en la tarjeta emergente y presiona "Obtener Ticket" para recibir tu código de acceso por email.

---
**Desarrollado por Kevin Cruz**