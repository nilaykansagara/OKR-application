import {Test, TestingModule} from '@nestjs/testing';
import {HelloWorldService} from './hello-world.service';

describe('HelloWorldService', () => {
    let service: HelloWorldService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HelloWorldService],
        }).compile();

        service = module.get<HelloWorldService>(HelloWorldService);
    });

    describe('show()', () => {
        it('should be defined', () => {
            expect(service).toBeDefined();
        });
        it('should return "Hello World"', () => {
            const response = service.show();
            expect(response).toBe("Hello World!");
        });
    })
});
