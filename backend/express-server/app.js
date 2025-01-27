import express from 'express';
import {faker} from "@faker-js/faker";

const app = express();

app.use(express.json());

const port = 3005;

app.get('/', (req, res) => {
    const dummyObject = {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "gender": faker.person.gender(),
        "Job Area": faker.person.jobArea()
    }
    res.status(200).send(dummyObject);
});

app.listen(port, () => {
    console.log(`Server is running on: ${port}...`);
});