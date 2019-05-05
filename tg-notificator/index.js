require('dotenv').config()
const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api')

const token = process.env.TG_TOKEN
const chat_id = process.env.TG_CHAT_ID

const bot = new TelegramBot(token, {polling: true})

const photo = '/tmp/photos/photo1.png'

bot.sendPhoto(chat_id, photo).then(res => console.log(res))

try {
  if (fs.existsSync(photo)) {
    console.log("FILE EXISTS")
  }
} catch(err) {
  console.error(err)
}
