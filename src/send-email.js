const sgMail = require('@sendgrid/mail')

const htmlGenerator = require('./html-generator')
const writeContactOnDb = require('./write-db')

const sendEmail = (req, res) => {
  res.set('Content-Type', 'application/json')
  console.log('Got request')
  if (req.body === null) {
    return res.status(400).send({ error: 'no JSON object in the request' })
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    from: 'Site Goiaba Clothes <no-reply@goiabaclothes.pt>',
    to: `${process.env.TECNICAL_EMAIL}, ${process.env.SALES_EMAIL}`,
    subject: 'Goiaba Clothes Site - Pedido de compra',
    html: htmlGenerator(req.body || {}),
  }
  sgMail.send(msg, false, (err, emailServiceDetails) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ err: err })
    }
    return writeContactOnDb(req.body)
      .then(({ dbsaved, dbError }) =>
        res.status(200).send({
          msg: `Email sent!`,
          emailServiceDetails,
          dbsaved,
          dbError,
        })
      )
  })
}

module.exports = sendEmail
