import {Test, TestingModule} from '@nestjs/testing';
import {ObjectivesService} from './objectives.service';
import {PrismaService} from "../prisma/prisma.service";
import {mockDeep} from "jest-mock-extended";

describe('ObjectivesService', () => {
    let service: ObjectivesService;
    const prismaService = mockDeep<PrismaService>();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ObjectivesService, {
                provide: PrismaService,
                useValue: prismaService
            }],
        }).compile();

        service = module.get<ObjectivesService>(ObjectivesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll()', () => {
        it('should call findMany method of prisma service', async () => {

            //act
            await service.getAll();

            //assert
            expect(prismaService.objective.findMany).toHaveBeenCalled();

        })

        it('should return all objectives', async () => {

            //arrange
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
            prismaService.objective.findMany.mockResolvedValue(dummyArrayOfObjective)

            //act
            const response = await service.getAll();

            //assert
            expect(response).toEqual(dummyArrayOfObjective);
        })

        it('should throw an error when findMany fails', async () => {

            //arrange
            const errorMessage = "Failed to fetch objectives";
            const error = new Error(errorMessage);
            prismaService.objective.findMany.mockRejectedValue(error);

            //act & assert
            try {
                await service.getAll();
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error.message).toBe(errorMessage);
            }

        })

    })

    describe('createOne()', () => {
        it('should call create method of prisma service with given objective', async () => {

            //act
            await service.createOne({title: "dummy objective 1"});

            //assert
            expect(prismaService.objective.create).toHaveBeenCalled();
        })

        it('should create objective and return that objective', async () => {

            //arrange
            const dummyObjective = {
                id: 1, title: "dummy 1"
            }
            prismaService.objective.create.mockResolvedValue(dummyObjective)

            //act
            const response = await service.createOne({title: "dummy objective 1"});

            //assert
            expect(response).toEqual(dummyObjective);
        })

    })
});
