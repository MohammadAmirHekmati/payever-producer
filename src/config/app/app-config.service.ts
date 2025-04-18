import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppMode } from 'src/common/enums/app-mode.enum';

@Injectable()
export class AppConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get appPort(): number {
    return Number(this.configService.get<number>('APP_PORT'));
  }

  public get appMode(): AppMode {
    const appMode: AppMode =
      AppMode[this.configService.get<string>('APP_MODE')];
    return appMode;
  }

  public get appApiPrefix(): string {
    return this.configService.get<string>('APP_PREFIX');
  }

  public get refreshTokenTimeToLive(): number {
    return Number(this.configService.get<string>('REFRESH_TOKEN_TTL'));
  }

  public get accessTokenTimeToLive(): number {
    return Number(this.configService.get<string>('ACCESS_TOKEN_TTL'));
  }
}
