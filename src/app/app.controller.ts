import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { App } from './app.entity';
import { AppDto } from './app.dto';

@Controller('app')
export class AppController {
  constructor(private readonly messageService: AppService) {}

  @Get()
  getAll(): Promise<App[]> {
    return this.messageService.findAll();
  }

  @Post()
  create(@Body() AppDto: { chatId: string, text: string ,username:string}): Promise<App> {
    return this.messageService.create(AppDto.chatId, AppDto.text,AppDto.username);
  }
}
