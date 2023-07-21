import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

const logger = new Logger('Main');

async function bootstrap() {
  dotenv.config();
  const password = 'Giovanne4?';
  const encodedPassword = encodeURIComponent(password);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://admin:${encodedPassword}@localhost:5672/smartranking`],
      queue: 'admin-backend',
    },
  });
  app.useLogger(logger);

  logger.log('Microserve is now running');
}
bootstrap();
