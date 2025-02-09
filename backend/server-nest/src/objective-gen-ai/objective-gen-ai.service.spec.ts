import { Test, TestingModule } from '@nestjs/testing';
import { ObjectiveGenAiService } from './objective-gen-ai.service';

describe('ObjectiveGenAiService', () => {
  let service: ObjectiveGenAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObjectiveGenAiService],
    }).compile();

    service = module.get<ObjectiveGenAiService>(ObjectiveGenAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
