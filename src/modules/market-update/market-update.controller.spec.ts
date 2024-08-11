import { Test, TestingModule } from '@nestjs/testing';
import { MarketUpdateController } from './market-update.controller';
import { MarketUpdateService } from './market-update.service';

describe('MarketUpdateController', () => {
  let controller: MarketUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarketUpdateController],
      providers: [MarketUpdateService],
    }).compile();

    controller = module.get<MarketUpdateController>(MarketUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
