
const htmlGenerator = ({ clientDetails = {}, cart = {} }) => {
  const htmlToReturn = `
    <div>
      <div style='display:flex;'>
        <img style='margin-right: 10px;margin-top: 20px;' width='30px' height='30px' src='https://www.goiabaclothes.pt/static/logo/big.png' />
        <h1>Goiaba Clothes Site - Pedido de compra</h1>
      </div>
      <p>Recebeu um pedido de compra através do site.<p>
      <h3>Dados do cliente</h3>
      ${Object.keys(clientDetails).map(clientDetailKey =>
    `<p><span>${clientDetailKey}:</span> ${clientDetails[clientDetailKey]}</p>`)}
      <h3>Produtos no carrinho</h3>
      ${Object.keys(cart).map(cartItemKey =>
    `<p><span>${cart[cartItemKey].fields.title} - quantity: ${cart[cartItemKey].quantity} - <a href='https://www.goiabaclothes.pt/product/?slug=${cartItemKey}'>link</a></span></p>`
  )}
    </div>
  `
  // console.log(htmlToReturn)
  return htmlToReturn
}

module.exports = htmlGenerator
