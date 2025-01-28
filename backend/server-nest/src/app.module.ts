import {Module} from '@nestjs/common';

import {HelloWorldModule} from './hello-world/hello-world.module';
import { ObjectivesModule } from './objectives/objectives.module';

@Module({imports: [HelloWorldModule, ObjectivesModule]})
export class AppModule {
}
