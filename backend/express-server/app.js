import express from 'express';
import {faker} from "@faker-js/faker";

const app = express();

app.use(express.json());

const port = 3005;

const mockObjective = {
    id:  faker.string.uuid(),
    title: faker.company.buzzPhrase(),
    keyResults: [
        {
            title:faker.company.catchPhrase(),
            initialValue: faker.number.int({ min: 0, max: 10 }),
            currentValue: faker.number.int({ min: 10, max: 50 }),
            targetValue: faker.number.int({ min: 50, max: 100 }),
            metrics: faker.company.buzzAdjective()
        }
    ]
}

app.get('/', (req, res) => {
    res.status(200).json(mockObjective);
});

app.listen(port, () => {
    console.log(`Server is running on: ${port}...`);
});