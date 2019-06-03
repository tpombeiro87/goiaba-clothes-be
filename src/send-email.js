const mailgun = require('mailgun-js')

const htmlGenerator = require('./html-generator')

const sendEmail = (req, res) => {
  res.set('Content-Type', 'application/json')
  console.log('Got request')
  if (req.body === null) {
    return res.status(400).send({ error: 'no JSON object in the request' })
  }

  const data = {
    from: 'Site Goiaba Clothes <site@goiabaclothes.com>',
    to: `${process.env.TECNICAL_EMAIL}`, //   , ${process.env.SALES_EMAIL}
    subject: 'Goiaba Clothes Site - Pedido de compra',
    html: htmlGenerator(req.body || {}),
  }
  const mailgunInstance = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN })
  mailgunInstance.messages().send(data, (err, body) => {
    if (err) {
      return res.status(500).send({ err: err })
    }
    console.log(body)
    return res.status(200).send({ msg: `Email sent!`, details: body })
  })
}

module.exports = sendEmail
