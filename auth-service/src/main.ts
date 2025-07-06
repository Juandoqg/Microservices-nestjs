import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Levantar HTTP
  const app = await NestFactory.create(AppModule);

  // Conectar microservicio TCP
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },
  });

  await app.startAllMicroservices();
  await app.listen(3000); 
  console.log('Auth HTTP is listening on port 3000');
  console.log('Auth microservice is listening on port 3001');
}
bootstrap();
