require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/submit-form', (req, res) => {
    const userName = req.body.name;
    const userPhone = req.body.phone;
    const userEmail = req.body.email
    const userSit = req.body.sit
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Ви отримали запит на безкоштовну консультацію від: ${userName}`,
        text: `You have received a new lead:\n\nІм'я: ${userName}\n\nНомер телефону: ${userPhone}\n\nПошта: ${userEmail}\n\nСитуація: ${userSit}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        res.status(200).send("Дякуємо! Ваша інформація успішно надіслана.");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});