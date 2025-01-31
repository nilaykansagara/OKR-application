import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import * as request from 'supertest';
import axios from 'axios';

describe('hello-world(Integration)', () => {

    let app: INestApplication;
    let app2: INestApplication;
    const PORT = 3000
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        const module2 = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();
        app2 = module2.createNestApplication();
        await app.init();
        await app2.listen(PORT);
    });

    afterEach(async () => {
        await app2.close();
    });

    it('AXIOS: @Get should return Hello world', async () => {
        const response = await axios.get(`http://localhost:${PORT}/hello-world/`);
        expect(response.data).toBe('Hello World!');
    })

    it.only('Supertest: @Get should return Hello world', async () => {
        const response = await request(app.getHttpServer()).get('/hello-world/');
        expect(response.text).toBe('Hello World!');
    })


})