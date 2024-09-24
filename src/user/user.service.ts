import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class UserService implements OnModuleInit {
  private readonly bot: Telegraf;
  private counter = 0;
  constructor() {
    this.bot = new Telegraf("7499384861:AAE1foD1GrtI-SxdquoQUh9KR2U5MfOHmlQ");

  }

  async onModuleInit() {
    this.bot.command("start",(ctx)=>{
      ctx.reply("Welcome to Telegram Mini App. Click the below button to open Mini App",{
        reply_markup:{
          inline_keyboard:[
            [{ text: 'Open Mini App', web_app: { url: 'https://www.youtube.com/' } }],
          ],
        },
      })
    }); 
    await this.bot.launch()
    console.log("Bot launched sucessfully")
  }
} 
