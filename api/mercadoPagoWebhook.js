import express from 'express';
import mercadopago from 'mercadopago';
import { Client, Databases } from 'appwrite';

const app = express();
app.use(express.json()); // Importante para interpretar o body como JSON

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

// Configurar Appwrite
const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const database = new Databases(client);
const DATABASE_ID = process.env.DATABASE_ID;
const PEDIDOS_COLLECTION_ID = process.env.COLLECTION_PEDIDOS;

// Webhook
app.post('/api/mercadoPagoWebhook', async (req, res) => {
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
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  return res.status(200).send('Evento ignorado');
});

// Rodar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
