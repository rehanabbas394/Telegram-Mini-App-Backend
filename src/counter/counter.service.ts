// src/counter/counter.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CounterService {
  private counter = 0;

  getCount() {
    return this.counter;
  }

  increment() {
    this.counter += 1;
    return this.counter;
  }
}
