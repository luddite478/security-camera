const https = require('https')
const fs = require('fs')
const path = require('path')
const TelegramBot = require('node-telegram-bot-api')
const express = require('express')
const multer = require('multer')
const helmet = require('helmet')

const uploadFolder = './data/'

require('dotenv').config()

const sslOptions = {
  key: fs.readFileSync('./secrets/secret.key', 'utf8'),
  cert: fs.readFileSync('./secrets/secret.crt', 'utf8')
}

const token = process.env.TG_TOKEN
const chat_id = process.env.TG_CHAT_ID
const apiEndpoint = process.env.API_ENDPOINT
const apiToken = process.env.API_TOKEN

const app = express()
const bot = new TelegramBot(token)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './data')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})


const upload = multer({ storage: storage }).single('data')

const isTokenOk = token => token === apiToken

app.use(helmet())

app.post(`/u/${apiEndpoint}`, (req, res) => {
  if(!isTokenOk(req.headers.token)){
    bot.sendMessage(chat_id, `SOMEONE IS USING WRONG TOKEN TO ACCESS API`)
    res.sendStatus(401)
    return;
  }

  upload(req, res, async (err) => {
    if (err) {
      bot.sendMessage(chat_id, `FAILED TO UPLOAD ${req.file.filename} TO SEVER: ${e}`)
      res.sendStatus(500)
      return;
    } else {
      console.log(`PHOTO ${req.file.filename} UPLOADED TO SEVER`)
      try {
        const resp = await bot.sendPhoto(chat_id, path.join(uploadFolder, req.file.filename), { caption: req.file.filename })
          if(res){
             console.log(`PHOTO ${req.file.filename} UPLOADED TO TELEGRAM`)
             res.sendStatus(200)
             return;
          } else {
             throw Error(`FAILED TO UPLOAD ${req.file.filename} TO TELEGRAM: ${e}`)
             res.sendStatus(500)
             return;
          }
      } catch(e) {
        bot.sendMessage(chat_id, `FAILED TO UPLOAD ${req.file.filename} TO TELEGRAM: ${e}`)
        res.sendStatus(500)
        return;
      }
    }
  })
})

https.createServer(sslOptions, app).listen(443)
