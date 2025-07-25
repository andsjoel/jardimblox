// api/mercadoPagoWebhook.js
import mercadopago from 'mercadopago';
import { Client, Databases } from 'appwrite';

// Configura Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Configura Appwrite
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const database = new Databases(client);
const DATABASE_ID = process.env.DATABASE_ID;
const PEDIDOS_COLLECTION_ID = process.env.COLLECTION_PEDIDOS;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const body = req.body;

  console.log('[WEBHOOK] Notificação recebida:', body);

  if (body.topic === 'payment') {
    try {
      const paymentId = body.id;
      const paymentResponse = await mercadopago.payment.findById(paymentId);
      const payment = paymentResponse.body;

      console.log('[WEBHOOK] Detalhes do pagamento:', payment);

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

      return res.status(200).send('Pagamento não aprovado');
    } catch (error) {
      console.error('[WEBHOOK] Erro ao processar:', error);
      return res.status(500).json({ error: 'Erro interno ao processar webhook' });
    }
  }

  return res.status(200).send('Evento ignorado');
}
