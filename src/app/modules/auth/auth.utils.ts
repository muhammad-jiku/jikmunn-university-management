import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import config from '../../../config';

export async function sendEmail(to: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host as string, // Use the SMTP host from the config
    port: config.smtp.port, // Use the SMTP port from the config
    secure: false,
    auth: {
      user: config.smtp.username, // Use the SMTP username from the config
      pass: config.smtp.password, // Use the SMTP password from the config
    },
  } as SMTPTransport.Options);

  await transporter.sendMail({
    from: config.smtp.sender, // sender address
    to, // list of receivers
    subject: 'Reset Password Link', // Subject line
    html, // html body
  });
}
