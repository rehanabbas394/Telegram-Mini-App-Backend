import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Telegraf, Context } from 'telegraf';
import { AppService } from '../app/app.service';
import { jokes } from './util/util.jokes';

@Injectable()
export class TelegramService implements OnModuleInit {
  private bot: Telegraf;
  private readonly logger = new Logger(TelegramService.name)

  constructor(private readonly appService: AppService) {
    this.bot = new Telegraf('7499384861:AAE1foD1GrtI-SxdquoQUh9KR2U5MfOHmlQ');
    this.setBotHandlers();
  }
  async onModuleInit() {
    try {
      await this.bot.launch();
      console.log('Bot has been launched successfully.');
    } catch (error) {
      console.error('Error launching bot:', error);
    }
  }

  setBotHandlers() {

    this.bot.start((ctx) => {
      const username = ctx.botInfo.username;
      ctx.reply(`Welcome, ${ctx.from.first_name}! You are chatting with ${username}.`);
    });

    this.bot.command('echo', (ctx) => {
      const text = ctx.message.text.split(' ').slice(1).join(' ');
      if (!text.trim()) {
        ctx.reply('You need to provide a message after the /echo command.');
      } else {
        ctx.reply(text);
      }
    });

    this.bot.help((ctx) => {
      ctx.reply('Available Commands:\n/help - Show help\n/weather - Get weather info\n/joke - Get a random joke\n/sticker - sticker');
    });

    this.bot.command('weather', async (ctx) => {
      const city = 'Islamabad';
      try {
        const weather = await this.weatherInfo(city);
        ctx.reply(weather);
      } catch (error) {
        ctx.reply(`Sorry, couldn't fetch the weather for ${city}.`);
        this.logger.error('Failed to fetch weather', error.stack);
      }
    });

    this.bot.command('joke', (ctx) => {
      const joke = this.randomJoke();
      ctx.reply(`Joke: ${joke}`);
    });

    this.bot.command('sticker', (ctx) => ctx.reply('Nice sticker! 😊👍'));

    if (!this.bot.command) {
      this.bot.command('unrecongized command', (ctx) => ctx.reply('unrecongized command'))
    };

    this.bot.on('message',async (ctx) => {
    console.log(ctx)
      try {
        const chatId = String(ctx.message.chat.id);
        const txt = ctx.botInfo.first_name;
        const u_name = ctx.botInfo.username
        await this.appService.create(chatId, txt, u_name);
        ctx.reply('Message saved!');
      }
       catch (error) {
        console.error('Error saving message:', error);
        ctx.reply('Failed to save the message.');
      }
    
      let Hi = "hi";
      if (ctx.text.toString().toLowerCase().indexOf(Hi) === 0) {
        this.bot.telegram.sendMessage(ctx.chat.id, "hlo how can i help you");
      }
    
      let response = "who are you";
      if (ctx.text.toString().toLowerCase().includes("who")) {
        this.bot.telegram.sendMessage(ctx.chat.id, "I am an intelligent telegram robot, built with Nest.js. Thanks for asking")
      }
    
    
      let response1 = "Do you love javascript";
      if (ctx.text.toString().toLowerCase().includes("javascript")) {
        this.bot.telegram.sendMessage(ctx.chat.id, "Yes I Love Javascript")
      }
    })
  }

  randomJoke(): string {
    const joke = jokes;
    return joke[Math.floor(Math.random() * joke.length)];
  }

  async weatherInfo(city: string): Promise<string> {
    const apikey = "678b4b63a2944a97ed3f2353eda5fc05";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.cod !== 200) {
        throw new Error(data.message);
      }
  
      const weather = {
        description: data.weather[0].description,
        temp: data.main.temp,
        humidity: data.main.humidity,
        city: data.name,
      };
  
      return `The weather in ${weather.city} is ${weather.temp}°C, ${weather.description}, with a humidity of ${weather.humidity}%.`;
    } catch (error) {
      this.logger.error('Error fetching weather data:', error.message);
      throw error; // Rethrow error for handling in command callback
    }
  }
} 






// this.bot.on('message', (ctx) => {

//   try {
//     const chatId = String(ctx.message.chat.id);
//     const text = "ctx.message.chat";
//     const u_name = ctx.botInfo.username
//     await this.appService.create(chatId, text, u_name);
//     ctx.reply('Message saved!');
//   }
//    catch (error) {
//     console.error('Error saving message:', error);
//     ctx.reply('Failed to save the message.');
//   }


//   let Hi = "hi";
//   if (ctx.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     this.bot.telegram.sendMessage(ctx.chat.id, "hlo how can i help you");
//   }

//   let response = "who are you";
//   if (ctx.text.toString().toLowerCase().includes("who")) {
//     this.bot.telegram.sendMessage(ctx.chat.id, "I am an intelligent telegram robot, built with Nest.js. Thanks for asking")
//   }


//   let response1 = "Do you love javascript";
//   if (ctx.text.toString().toLowerCase().includes("javascript")) {
//     this.bot.telegram.sendMessage(ctx.chat.id, "Yes I Love Javascript")
//   }

// })
































      // this.bot.on('text', async (ctx) => {
      //   try {
      //     const chatId = String(ctx.message.chat.id);
      //     const text = ctx.message.text;
      //     const u_name = ctx.botInfo.username
      //     await this.appService.create(chatId, text, u_name);
      //     ctx.reply('Message saved!');
      //   }
      //    catch (error) {
      //     console.error('Error saving message:', error);
      //     ctx.reply('Failed to save the message.');
      //   }
      // });