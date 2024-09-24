import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { App } from './app/app.entity';
import { AppeModule } from './app/app.module';

@Module({
  imports: [AppeModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'telegram_miniapp_db',
      entities: [App],
      synchronize: true, 
    }),
    
  ],
})
export class AppModule {}
