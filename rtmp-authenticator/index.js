const express = require('express')
const url = require('url').URL
const dotenv = require('dotenv').config()

const app = express()

app.get('/auth', (req, res) => {
  console.log("NEW AUTH REQUEST: ", req.query)

  if(!req.query.hasOwnProperty("p")) {
    res.send(401)
    return;
  }

  if(req.query.p === process.env.AUTH_PASSWORD) {
    res.send(200)
    return;
  } else {
    console.log("Wrong pass, sending 401")
    res.send(401)
    return;
  }
})

app.listen(80, () => {
  console.log('Authenticator is listening on 80')
})

