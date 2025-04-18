import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfigService = app.get<AppConfigService>(AppConfigService);

  await app.listen(appConfigService.appPort);
}
bootstrap();
