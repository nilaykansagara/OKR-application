import {Injectable} from '@nestjs/common';

@Injectable()
export class ObjectivesService {
    objectives = [{
        id: "2bh3",
        title: "objective 1",
        keyResults: []
    }]

    getAll() {
        return this.objectives;
    }
}
