import express from 'express';
import nodemailer from 'nodemailer';
import { Request, Response } from 'express';
import MessageResponse from '../interfaces/MessageResponse';
require('dotenv').config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  }
});

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'mailer - 👋🌎🌍🌏',
  });
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { to, subject, message } = req.body;

    const mailOptions = {
      from:process.env.EMAIL_USER,
      to,
      subject,
      message,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo electrónico enviado correctamente.' });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    res.status(500).json({ message: 'Hubo un problema al enviar el correo electrónico.' });
  }
});

export default router;

