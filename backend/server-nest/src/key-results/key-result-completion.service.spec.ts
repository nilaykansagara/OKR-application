import {Test, TestingModule} from '@nestjs/testing';
import {KeyResultCompletionService} from "./key-result-completion.service";
import {KeyResultDto} from "./key-result.dto";

describe('KeyResultCompletionService', () => {
    let service: KeyResultCompletionService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [KeyResultCompletionService],
        }).compile();

        service = module.get<KeyResultCompletionService>(KeyResultCompletionService);
    });

    const dummyKeyResult: KeyResultDto = {
        title: "Test",
        target_value: 1,
        current_value: 1,
        initial_value: 0,
        metrics: "Done",
        objectiveId: 1
    }
    describe('isComplete()', () => {
        it('should return true if target value and current value are equal', () => {
            const response = service.isComplete(dummyKeyResult);
            expect(response).toBeTruthy();
        });
    })
});
