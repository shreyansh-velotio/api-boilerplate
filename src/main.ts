import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';

// Entry point
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
