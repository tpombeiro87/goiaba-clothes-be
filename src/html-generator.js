
const htmlGenerator = ({ uuid, clientDetails = {}, cart = {} }) => {
  const clientDetailsHtml = Object.keys(clientDetails)
    .map(clientDetailKey =>
      `<p><span style='font-weight: bold;'>${clientDetailKey}:</span> ${clientDetails[clientDetailKey]}</p>`
    )
    .join(' ')
  const cartDetailsHtml = Object.keys(cart)
    .map(cartItemKey =>
      `<p><span style='font-weight: bold;'>${cart[cartItemKey].fields.title} - quantidade: ${cart[cartItemKey].quantity} - <a href='https://www.goiabaclothes.pt/product/?slug=${cartItemKey}'>link</a></span></p>`
    )
    .join(' ')
  const htmlToReturn = `
    <div style='color: black;'>
      <div style='display:flex;'>
        <img style='margin-right: 10px;margin-top: 20px;' width='30px' height='30px' src='https://www.goiabaclothes.pt/static/logo/big.png' />
        <h1>Goiaba Clothes Site - Pedido de compra</h1>
      </div>
      <h3 style='margin-top: 0px;'>Recebeu um pedido de compra através do site.</h3>
      <h3 style='margin-top: 25px;'>DADOS DO CLIENTE</h3>
      ${clientDetailsHtml}
      <h3 style='margin-top: 25px;'>PRODUTOS NO CARRINHO</h3>
      ${cartDetailsHtml}
      <p style='font-size: 10px;color: gray;'>system reference / uuid: ${uuid}</p>
    </div>
  `
  // console.log(htmlToReturn)
  return htmlToReturn
}

module.exports = htmlGenerator
