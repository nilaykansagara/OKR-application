import {INestApplication} from "@nestjs/common";
import {Test} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import axios from "axios";

describe('hello-world(Integration)', () => {

    let app: INestApplication;
    const PORT = 3000
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = module.createNestApplication();
        await app.listen(PORT);
    });

    afterEach(async () => {
        await app.close();
    });

    it('@Get should return Hello world', async () => {
        const response = await axios.get(`http://localhost:${PORT}/hello-world/`);
        expect(response.data).toBe('Hello World!');
    })
})