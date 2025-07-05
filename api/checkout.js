import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { title, quantity, price } = req.body;

  if (!title || !quantity || !price) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  const origin = req.headers.origin || 'https://jardimblox.vercel.app'; // fallback seguro

  try {
    const preference = {
      items: [
        {
          title,
          quantity,
          unit_price: Number(price),
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        success: `${origin}/sucesso`,
        failure: `${origin}/erro`,
        pending: `${origin}/pendente`,
      },
      auto_return: 'approved',
    };

    const result = await mercadopago.preferences.create(preference);
    return res.status(200).json({ init_point: result.body.init_point });
  } catch (err) {
    console.error('Erro ao criar preferência:', err);
    return res.status(500).json({ error: 'Erro ao criar preferência' });
  }
}
