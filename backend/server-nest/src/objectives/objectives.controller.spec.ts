import {Test, TestingModule} from '@nestjs/testing';
import {ObjectivesController} from './objectives.controller';
import {ObjectivesService} from "./objectives.service";
import {mockDeep} from "jest-mock-extended";

describe('ObjectivesController', () => {
    let controller: ObjectivesController;
    const objectivesService = mockDeep<ObjectivesService>();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ObjectivesController],
            providers: [{
                provide: ObjectivesService,
                useValue: objectivesService
            }]
        }).compile();

        controller = module.get<ObjectivesController>(ObjectivesController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll()', () => {
        it('should call getAll method of objective service', async () => {

            await controller.getAll();

            expect(objectivesService.getAll).toHaveBeenCalled();
        })
        it('should return all objectives', async () => {
            const dummyArrayOfObjective = [
                {
                    id: 1,
                    title: "dummy 1"
                },
                {
                    id: 2,
                    title: "dummy 2"
                }
            ]
            objectivesService.getAll.mockResolvedValue(dummyArrayOfObjective);

            const response = await controller.getAll();

            expect(response).toEqual(dummyArrayOfObjective);
        })
    })

    describe('createOne()', () => {
        it('should call createOne method of objective service', async () => {

            await controller.createOne({title: "dummy objective 1"});

            expect(objectivesService.createOne).toHaveBeenCalled();
        })
        it('should create objective and return that objective', async () => {

            const dummyObjective = {
                id: 1, title: "dummy 1"
            }

            objectivesService.createOne.mockResolvedValue(dummyObjective);

            const response = await controller.createOne(dummyObjective);

            expect(response).toEqual(dummyObjective);
        })
    })
});
