require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mailgun = require('mailgun-js')
const cors = require('cors')

const app = express()
module.exports = app

app.use(cors())
app.use(bodyParser.json())

app.post('*', (req, res) => {
  res.set('Content-Type', 'application/json')
  console.log('Got request')
  if (req.body === null) {
    return res.status(400).send({ error: 'no JSON object in the request' })
  }

  const data = {
    from: 'Site Goiaba Clothes <site@goiabaclothes.com>',
    to: `${process.env.TECNICAL_EMAIL}`, // , ${process.env.SALES_EMAIL}
    subject: 'Goiaba Clothes Site - Pedido de compra',
    text: `Email! ${JSON.stringify(req.body, null, 4)}`,
  }
  const mailgunInstance = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })
  mailgunInstance.messages().send(data, (err, body) => {
    if (err) {
      return res.status(500).send({ err: err })
    }
    console.log(body)
    return res.status(200).send({ msg: `Email sent!`, details: body })
  })
})

app.all('*', (req, res) => {
  return res.status(405).send({ error: 'only POST requests are accepted' })
})

app.use((err, req, res, next) => {
  console.log('Error: ', JSON.stringify(err, null, 2), err.message)

  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err,
    stack: err.stack,
  })
})

if (process.env.LOCAL_DEV === 'true') {
  app.listen(3000, () => {
    console.log('goiaba-clothes-be listening on port 3000!')
  })
}
