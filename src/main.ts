import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RolesGuard } from './gaurds/roles.gaurds';
import { AllExceptionsFilter } from './utils/exceptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new AllExceptionsFilter());
  /*setup gaurd for role, we can also setup gaurd to specific routes by just using @UseGuards(RolesGuard) in controllers*/
  app.useGlobalGuards(new RolesGuard());

  /* setup swagger for api documentation purposes  */
  const config = new DocumentBuilder()
    .setTitle('Nestjs Learning')
    .setDescription('The nestjs learning API description')
    .setVersion('1.0')
    .addTag('learning')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
