import {KeyResultsService} from "./key-results.service";
import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../prisma/prisma.service";
import {ObjectiveDto} from "../objectives/objectives.dto";
import {mockDeep} from "jest-mock-extended";
import {KeyResultDto} from "./key-result.dto";

describe("KeyResultsService", () => {

    let keyResultsService: KeyResultsService;
    const prismaService = mockDeep<PrismaService>();

    let module: TestingModule;
    beforeEach(async () => {
        // (async function () {
        module = await Test.createTestingModule({
            providers: [KeyResultsService, {
                provide: PrismaService,
                useValue: prismaService
            }]
        }).compile();
        keyResultsService = module.get<KeyResultsService>(KeyResultsService);
        // })()


    })

    describe("fetch unique function", () => {
        let objective: ObjectiveDto & { id: number }
        beforeEach(async () => {
            prismaService.keyResult.findUnique.mockResolvedValue({
                id: 1,
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 100,
                metrics: "dummy metrics",
                objectiveId: 1
            })
            objective = await prismaService.objective.create({
                data: {title: "dummy objective 1",}
            })
        })

        it("should return unique key result", async () => {

            const response = await keyResultsService.fetchUnique(3);
            console.log(response);
            expect(response).toBeDefined();
        })

        it("should return existing key result", async () => {

            const dummyKeyResult = {
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 100,
                metrics: "dummy metrics",
                objectiveId: 1
            }
            expect(await keyResultsService.fetchUnique(1)).toEqual({...dummyKeyResult, id: expect.any(Number)})
        })
    })

    describe("create keyResult", () => {
        let dummyKeyResult: KeyResultDto & { id: number }
        beforeEach(async () => {
            dummyKeyResult = {
                id: 1,
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 100,
                metrics: "dummy metrics",
                objectiveId: 1
            };
            prismaService.keyResult.create.mockResolvedValue(dummyKeyResult);
        })

        it("should create keyResult and return keyResult", async () => {
            const response = await keyResultsService.createOne({
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 100,
                metrics: "dummy metrics",
                objectiveId: 1
            })
            expect(dummyKeyResult).toEqual(response)
        })
    })

    describe('progress', () => {
        it('should return progress percentage', async () => {
            // arrange
            const keyResult = {
                id: 1,
                title: "dummy keyresult 1",
                initial_value: 0,
                current_value: 1,
                target_value: 10,
                metrics: "dummy metrics",
                objectiveId: 1
            };
            prismaService.keyResult.findUnique.mockResolvedValue(keyResult);

            // act
            const response = await keyResultsService.progress(keyResult.id);

            // assert
            expect(response).toEqual("10.00");
        });
    });
})