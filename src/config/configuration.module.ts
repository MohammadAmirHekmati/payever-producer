import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app/app-config.service';
import { RabbitMqConfigService } from './rabbitmq/rabbitmq-config.service';
import { envValidationSchema } from './validation/env.vallidation';
import { MongoConfigService } from './mongo/mongo-config.service';

@Global()
@Module({
  providers: [AppConfigService, RabbitMqConfigService,MongoConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),
  ],
  exports: [AppConfigService, RabbitMqConfigService,MongoConfigService],
})
export class ConfigurationModule {}
