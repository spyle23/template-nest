import { Test, TestingModule } from '@nestjs/testing';
import { BustargetService } from './bustarget.service';

describe('BustargetService', () => {
  let service: BustargetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BustargetService],
    }).compile();

    service = module.get<BustargetService>(BustargetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
