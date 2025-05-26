import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import subscribeToEvents from './app/events';
import config from './config';
import { errorlogger, logger } from './shared/logger';
import { RedisClient } from './shared/redis';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await RedisClient.connect().then(() => {
      subscribeToEvents();
    });

    await mongoose.connect(config.database_url as string);
    logger.info(`Database is connected successfully!`);

    server = app.listen(config.port, () => {
      logger.info(`Server is running on http://localhost:${config.port}`);
    });
  } catch (err) {
    errorlogger.error('Failed to connect database', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
