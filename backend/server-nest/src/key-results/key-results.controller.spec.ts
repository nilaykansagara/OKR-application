import {Test, TestingModule} from '@nestjs/testing';
import {KeyResultsController} from './key-results.controller';
import {KeyResultsService} from "./key-results.service";
import {KeyResultCompletionService} from "./key-result-completion.service";
import {mockDeep} from "jest-mock-extended";

describe('KeyResultsController', () => {
    let controller: KeyResultsController;
    let keyResultCompletionService = mockDeep<KeyResultCompletionService>();
    let KeyResultService = mockDeep<KeyResultsService>();
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [KeyResultsController],
            providers: [
                {
                    provide: KeyResultsService,
                    useValue: KeyResultService
                },
                {
                    provide: KeyResultCompletionService,
                    useValue: keyResultCompletionService
                }]
        }).compile();

        controller = module.get<KeyResultsController>(KeyResultsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
