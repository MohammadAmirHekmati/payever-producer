import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMqConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get rabbitUrl(): string {
    return this.configService.get<string>('RABBIT_URL');
  }
}
