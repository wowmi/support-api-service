import { Test, TestingModule } from '@nestjs/testing';
import { MarketUpdateService } from './market-update.service';

describe('MarketUpdateService', () => {
  let service: MarketUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketUpdateService],
    }).compile();

    service = module.get<MarketUpdateService>(MarketUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
