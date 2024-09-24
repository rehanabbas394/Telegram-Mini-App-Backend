import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from './app.entity';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TelegramService } from 'src/telegram/telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  providers: [AppService,TelegramService],
  controllers: [AppController],
})
export class AppeModule {}
