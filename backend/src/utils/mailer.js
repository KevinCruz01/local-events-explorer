const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendReservationEmail = async (eventDetails, userEmail) => {
    try {
        // Generamos un código de ticket aleatorio (ej. A8F93K)
        const ticketCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const mailOptions = {
            from: `"Explorador de Eventos" <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `Tu Ticket para: ${eventDetails.title}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; text-align: center;">
                    <h2 style="color: #0d6efd;">¡Reserva Confirmada!</h2>
                    <p>Has asegurado tu lugar para el siguiente evento:</p>
                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left;">
                        <h3 style="margin-top: 0; color: #333;">${eventDetails.title}</h3>
                        <p><strong>Fecha:</strong> ${new Date(eventDetails.event_date).toLocaleString('es-MX')}</p>
                        <p><strong>Categoría:</strong> ${eventDetails.category}</p>
                        <p><strong>Coordenadas:</strong> ${eventDetails.lat}, ${eventDetails.lng}</p>
                    </div>
                    <div style="background-color: #212529; color: white; padding: 15px; border-radius: 8px; font-size: 24px; letter-spacing: 5px;">
                        <strong>${ticketCode}</strong>
                    </div>
                    <p style="font-size: 14px; color: #666; margin-top: 20px;">Presenta este código en la entrada del evento.</p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Ticket enviado con éxito a:', userEmail);
    } catch (error) {
        console.error('Error enviando el ticket:', error.message);
    }
};

module.exports = {
    sendReservationEmail
};