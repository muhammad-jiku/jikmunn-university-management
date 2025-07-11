import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URI,
  default: {
    user_pass: process.env.DEFAULT_USER_PASS,
    student_pass: process.env.DEFAULT_STUDENT_PASS,
    faculty_pass: process.env.DEFAULT_FACULTY_PASS,
    admin_pass: process.env.DEFAULT_ADMIN_PASS,
  },
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  redis: {
    url: process.env.REDIS_URL,
    expires_in: process.env.REDIS_TOKEN_EXPIRES_IN,
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
    sender: process.env.SMTP_SENDER, // Using the same email as sender
  },
  frontend_url: process.env.FRONTEND_URL,
  reset_link: process.env.RESET_PASS_UI_LINK,
};
