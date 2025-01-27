import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  show(): string {
    return 'Hello World!';
  }
}
