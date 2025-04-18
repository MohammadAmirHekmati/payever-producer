import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MongoConfigService } from './mongo-config.service';

describe('MongoConfigService', () => {
  let service: MongoConfigService;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    mockConfigService = {
      get: jest.fn(),
    } as unknown as jest.Mocked<ConfigService>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoConfigService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<MongoConfigService>(MongoConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('mongoUrl', () => {
    it('should return configured URL', () => {
      mockConfigService.get.mockReturnValue('mongodb://test:27017');
      expect(service.mongoUrl).toBe('mongodb://test:27017');
      expect(mockConfigService.get).toHaveBeenCalledWith('MONGO_URL');
    });

    it('should throw if URL not configured', () => {
      mockConfigService.get.mockReturnValue(undefined);

      expect(() => service.mongoUrl).toThrow('MongoDB URL not configured');
    });
  });

  describe('mongoDatabase', () => {
    it('should return configured database name', () => {
      mockConfigService.get.mockReturnValue('payever');

      expect(service.mongoDatabase).toBe('payever');
      expect(mockConfigService.get).toHaveBeenCalledWith('MONGO_DATABASE');
    });

    it('should return default database if not configured', () => {
      mockConfigService.get.mockReturnValue(undefined);
      expect(service.mongoDatabase).toBe('test'); 
    });
  });
});