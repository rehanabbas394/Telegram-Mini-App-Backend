import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(App)
    private messageRepository: Repository<App>,
  ) {}

  findAll(): Promise<App[]> {
    return this.messageRepository.find();
  }

  create(chatId: string, text: any,username:string): Promise<App> {
    const newMessage = this.messageRepository.create({ chatId, text,username });
    return this.messageRepository.save(newMessage);
  }
}
