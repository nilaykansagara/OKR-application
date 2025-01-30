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
        it('should call findMany method of getAll method', async () => {
            //arrange

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

        // it('should throw an error when findMany fails', async () => {
        //
        //     //arrange
        //     const errorMessage = "Failed to fetch objective";
        //     const error = new Error(errorMessage);
        //     prismaService.objective.findMany.mockResolvedValue(new Error(errorMessage));
        //
        //     //act
        //     try {
        //         await service.getAll();
        //     } catch (error) {
        //         // Assert: Ensure the error is of type Error and has the expected message
        //         expect(error).toBeInstanceOf(Error);
        //         expect(error.message).toBe(errorMessage);
        //     }
        //     //assert
        // })

    })
});
