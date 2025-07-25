require('dotenv').config();
const express = require('express');

const mercadopago = require('mercadopago');

console.log('Token:', process.env.MERCADO_PAGO_ACCESS_TOKEN);

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});


const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

app.post('/api/mercadoPagoWebhook', async (req, res) => {
  console.log('Webhook recebido:', req.body);
  res.status(200).send('ok');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
