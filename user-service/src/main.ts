import { NestFactory } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3002, // Este puerto debe coincidir con el cliente
    },
  });

  await app.listen();
  console.log('User microservice is listening on port 3002');
}
bootstrap();
