import { Module } from '@nestjs/common';
import { ConfigurationModule } from './config/configuration.module';
import { InvoiceModule } from './api/invoice/invoice.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigService } from './config/mongo/mongo-config.service';
import { RabbitMqConfigService } from './config/rabbitmq/rabbitmq-config.service';
import { RabbitModule } from './utility/rabbit/rabbit.module';

@Module({
  imports: [ConfigurationModule,InvoiceModule,
    RabbitModule,
    MongooseModule.forRootAsync({
      imports:[ConfigurationModule],
      inject:[MongoConfigService,RabbitMqConfigService],
      useFactory:(mongoConfigService:MongoConfigService)=>({
        uri:`${mongoConfigService.mongoUrl}`,
        dbName:`${mongoConfigService.mongoDatabase}`,
        auth: {
          username: mongoConfigService.mongoUsername,
          password: mongoConfigService.mongoPassword
        },
        authSource:"admin"
      })
    })
  ],
})
export class AppModule {}
