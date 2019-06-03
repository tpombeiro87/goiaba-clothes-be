require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const sendEmail = require('./src/send-email')

const app = express()
module.exports = app

app.use(cors())
app.use(bodyParser.json())

app.post('*', sendEmail)

app.all('*', (req, res) => {
  return res.status(405).send({ error: 'only POST requests are accepted' })
})

app.use((err, req, res, next) => {
  console.log('Error: ', JSON.stringify(err, null, 2), err.message)
  console.log('Stacktrace: ', err.stack)

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
