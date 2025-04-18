import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitMqConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get rabbitHost(): string {
    return this.configService.get<string>('RABBIT_HOST');
  }

  public get rabbitUsername(): string {
    return this.configService.get<string>('RABBIT_USERNAME');
  }

  public get rabitPassword(): string {
    return this.configService.get<string>('RABBIT_PASSWORD');
  }

  public get rabbitPort(): number {
    return Number(this.configService.get<string>('RABBIT_PORT'));
  }
}
