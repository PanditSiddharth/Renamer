
// const { Telegraf } = require("telegraf")
import keep_alive from "./keep_alive"
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.TOKEN, { handlerTimeout: 500000 * 1000 })
import start from './bot/'
const { message } = require('telegraf/filters');

keep_alive()

try {
  start(bot);
  console.log('running')
} catch (error: any) {
  console.log(error.message);
}

bot.launch({
  allowedUpdates: [
    'update_id',
    'message',
    'edited_message',
    'channel_post',
    'edited_channel_post',
    'inline_query',
    'chosen_inline_result',
    'callback_query',
    'shipping_query',
    'pre_checkout_query',
    'poll',
    'poll_answer',
    'my_chat_member',
    'chat_member',
    'chat_join_request'
  ],
  dropPendingUpdates: true, // Don't activate this
});