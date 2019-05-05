require('dotenv').config()
const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api')
const chokidar = require('chokidar')
const findRemoveSync = require('find-remove')

const watchFolder = "/tmp/photos"

const token = process.env.TG_TOKEN
const chat_id = process.env.TG_CHAT_ID

const bot = new TelegramBot(token, {polling: true})

const watcher = chokidar.watch(watchFolder, {
  ignored: /^\./,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 2000,
    pollInterval: 100
  }
})

watcher
  .on('add', sendToTgChannel)

setInterval(findRemoveSync.bind(this, watchFolder, {age: {seconds: 30}}), 120)

function sendToTgChannel(photoPath){
  try {
    if (fs.existsSync(photoPath)) {
       console.log("Found new photo: ", photoPath)
       bot.sendPhoto(chat_id, photoPath).then(res => console.log(res))
    }
  } catch(err) {
    console.error(err)
  }
}
