import {Test, TestingModule} from '@nestjs/testing';
import {KeyResultsController} from './key-results.controller';
import {KeyResultsService} from "./key-results.service";
import {KeyResultCompletionService} from "./key-result-completion.service";
import {mockDeep} from "jest-mock-extended";

describe('KeyResultsController', () => {
    let controller: KeyResultsController;
    let keyResultCompletionService = mockDeep<KeyResultCompletionService>();
    let keyResultService = mockDeep<KeyResultsService>();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [KeyResultsController],
            providers: [
                {
                    provide: KeyResultsService,
                    useValue: keyResultService
                },
                {
                    provide: KeyResultCompletionService,
                    useValue: keyResultCompletionService
                }]
        }).compile();

        controller = module.get<KeyResultsController>(KeyResultsController);
    });

    describe('progress', () => {
        it('should return progress percentage', async () => {
            //arrange
            const keyResult = {
                id: 2,
                title: "test keyresult",
                initial_value: 0,
                current_value: 2,
                target_value: 10,
                metrics: "keyresults",
                objectiveId: 1

            }
            keyResultService.progress.mockResolvedValue("20.00");

            //act
            const response = await controller.progress(keyResult.id.toString());

            //assert
            expect(response).toEqual("20.00");
            expect(keyResultService.progress).toHaveBeenCalled();
        });
    });
});
