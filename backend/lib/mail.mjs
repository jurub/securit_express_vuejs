import nodemailer from "nodemailer";

export function sendMyMail({ from, to, subject, text }) {
  const transporter = nodemailer.createTransport({
    // Références à des variables d'environnement (cf. fichier .env)
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    name: process.env.MAIL_DOMAIN,
  });
  // Ceci renvoie une promesse
  return transporter.sendMail({ from, to, subject, text, html: text });
}
