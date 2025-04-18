import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { RabbitMqConfigService } from './rabbitmq-config.service';

describe('RabbitMqConfigService', () => {
  let service: RabbitMqConfigService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RabbitMqConfigService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RabbitMqConfigService>(RabbitMqConfigService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return the correct RabbitMQ host string when configured properly', () => {
    const mockRabbitHost = 'localhost';
    jest.spyOn(configService, 'get').mockReturnValue(mockRabbitHost);

    const result = service.rabbitHost;

    expect(result).toBe(mockRabbitHost);
    expect(configService.get).toHaveBeenCalledWith('RABBIT_HOST');
  });

  it('should return the correct RabbitMQ port number when configured properly', () => {
    const mockRabbitPort = '5672';
    jest.spyOn(configService, 'get').mockReturnValue(mockRabbitPort);

    const result = service.rabbitPort;

    expect(result).toBe(Number(mockRabbitPort));
    expect(configService.get).toHaveBeenCalledWith('RABBIT_PORT');
  });

  it('should handle empty string values for RABIT_HOST and RABIT_PORT', () => {
    jest.spyOn(configService, 'get').mockImplementation((key) => {
      if (key === 'RABBIT_HOST') return '';
      if (key === 'RABBIT_PORT') return '';
      return undefined;
    });

    expect(service.rabbitHost).toBe('');
    expect(service.rabbitPort).toBe(0);

    expect(configService.get).toHaveBeenCalledWith('RABBIT_HOST');
    expect(configService.get).toHaveBeenCalledWith('RABBIT_PORT');
  });

  it('should maintain consistency in returned values across multiple calls to rabbitHost and rabbitPort', () => {
    const mockHost = 'test-host';
    const mockPort = '5672';

    jest.spyOn(configService, 'get').mockImplementation((key) => {
      if (key === 'RABBIT_HOST') return mockHost;
      if (key === 'RABBIT_PORT') return mockPort;
      return undefined;
    });

    const host1 = service.rabbitHost;
    const port1 = service.rabbitPort;
    const host2 = service.rabbitHost;
    const port2 = service.rabbitPort;

    expect(host1).toBe(mockHost);
    expect(port1).toBe(Number(mockPort));
    expect(host2).toBe(mockHost);
    expect(port2).toBe(Number(mockPort));
    expect(host1).toBe(host2);
    expect(port1).toBe(port2);

    expect(configService.get).toHaveBeenCalledWith('RABBIT_HOST');
    expect(configService.get).toHaveBeenCalledWith('RABBIT_PORT');
    expect(configService.get).toHaveBeenCalledTimes(4);
  });
});
