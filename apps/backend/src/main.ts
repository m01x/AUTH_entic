import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Activamos la validación global (protegerá nuestros endpoints)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si envían propiedades extra
      transform: true, // Transforma los payloads a las instancias de los DTOs
    }),
  );

  // 2. Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('AUTH_entic API')
    .setDescription('Documentación de la API para nuestro sistema de autenticación')
    .setVersion('1.0')
    .addBearerAuth() // Preparando el terreno para nuestros futuros JWT
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 3. Habilitar CORS para cuando conectemos el Frontend
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();