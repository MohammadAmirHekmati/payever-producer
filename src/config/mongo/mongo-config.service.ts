import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MongoConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get mongoUrl(): string {
    return this.configService.get<string>('MONGO_URL');
  }

  public get mongoDatabase(): string {
    return this.configService.get<string>('MONGO_DATABASE');
  }

  public get mongoUsername(): string {
    return this.configService.get<string>('MONGO_USERNAME');
  }

  public get mongoPassword(): string {
    return this.configService.get<string>('MONGO_PASSWORD');
  }
}
