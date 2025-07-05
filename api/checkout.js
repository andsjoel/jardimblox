// /api/checkout.js
import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const { title, quantity, price } = req.body;

    const preference = {
      items: [
        {
          title,
          quantity,
          currency_id: 'BRL',
          unit_price: parseFloat(price)
        }
      ],
      back_urls: {
        success: 'https://seusite.com/sucesso',
        failure: 'https://seusite.com/erro',
        pending: 'https://seusite.com/pendente'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: response.body.init_point });

  } catch (error) {
    console.error('Erro no checkout:', error);
    return res.status(500).json({ error: 'Erro ao iniciar pagamento' });
  }
}
