import { Test, TestingModule } from '@nestjs/testing';
import { BustargetController } from './bustarget.controller';

describe('BustargetController', () => {
  let controller: BustargetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BustargetController],
    }).compile();

    controller = module.get<BustargetController>(BustargetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
