import mercadopago from 'mercadopago';
import { Client, Databases } from 'appwrite';

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

const client = new Client();
client
  .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
  .setProject(process.env.REACT_APP_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY); // Você precisa criar essa variável no seu .env

const database = new Databases(client);

const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
const PEDIDOS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PEDIDOS;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const paymentData = req.body;

  try {
    if (paymentData.type === 'payment') {
      const paymentId = paymentData.data.id;

      const paymentResponse = await mercadopago.payment.findById(paymentId);
      const payment = paymentResponse.body;

      if (payment.status === 'approved') {
        const pedidoId = payment.external_reference;

        await database.updateDocument(
          DATABASE_ID,
          PEDIDOS_COLLECTION_ID,
          pedidoId,
          { status: 'Pagamento concluído' }
        );

        return res.status(200).send('Status atualizado');
      }
    }

    return res.status(200).send('Evento ignorado');
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
