import {Test, TestingModule} from '@nestjs/testing';
import {ObjectiveGenAiController} from './objective-gen-ai.controller';
import {ObjectiveGenAiService} from "./objective-gen-ai.service";
import {mockDeep} from "jest-mock-extended";

describe('ObjectiveGenAiController', () => {
    let controller: ObjectiveGenAiController;
    let objectiveGenAiService = mockDeep<ObjectiveGenAiService>();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ObjectiveGenAiController],
            providers: [{
                provide: ObjectiveGenAiService,
                useValue: objectiveGenAiService
            }]
        }).compile();

        controller = module.get<ObjectiveGenAiController>(ObjectiveGenAiController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
