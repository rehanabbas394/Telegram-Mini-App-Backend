import { Controller, Get, Post } from '@nestjs/common';
import { CounterService } from './counter.service';
import { count } from 'console';

@Controller('counter/')
export class CounterController {
  constructor(private readonly counterService: CounterService) {}

  @Get()
  getCount() {
    console.log(count)
    return { count: this.counterService.getCount() };
  }

  @Post()
  increment() {
    return { count: this.counterService.increment() };
  }
}
 