// const { Telegraf, Context } = require("telegraf");
import { Telegraf, Context } from 'telegraf'
import axios from 'axios'
export const sleep = (t: number | undefined) => new Promise((resolve) => setTimeout(resolve, t));

let start = async (bot: Telegraf) => {
  bot.start((ctx: any) => {
    ctx.reply('Send me link to short \nFor more bots and updates Join @LogicBots\nDeveloper: @PanditSiddharth')

    bot.telegram.sendMessage(1791106582, `Started by ${ctx.message.from.id} ${ctx.message.from.username ? '@' + ctx.message.from.username : ctx.message.from.first_name}`)
    .catch((err: any) => {ctx.reply(err.message)})
  })
  
  bot.hears(/(?:^|[\s\n])(?:(?:https?):\/\/)?[\w-]+(?:\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/i
, async (ctx: any)=> {
    bot.telegram.sendMessage(1791106582, `Used by ${ctx.message.from.id} ${ctx.message.from.username ? '@' + ctx.message.from.username : ctx.message.from.first_name}
Link: ${ctx.message.text}`)
    .catch((err: any) => {ctx.reply(err.message)})
  
    ctx.reply(await surl(ctx.match[0]))
    .catch((err: any) => {ctx.reply(err.message)})
  })
}

export default start;

async function surl(longUrl: string): Promise<string> {
  const response = await axios.get(`https://tinyurl.com/api-create.php?url=${longUrl}`);
  const shortUrl = response.data;
  return shortUrl;
}
