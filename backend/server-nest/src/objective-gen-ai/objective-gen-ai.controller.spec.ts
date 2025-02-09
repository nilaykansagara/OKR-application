import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveGenAiController } from './objective-gen-ai.controller';

describe('ObjectiveGenAiController', () => {
  let controller: ObjectiveGenAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObjectiveGenAiController],
    }).compile();

    controller = module.get<ObjectiveGenAiController>(ObjectiveGenAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
