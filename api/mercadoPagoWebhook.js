import mercadopago from 'mercadopago';
import { databases } from '../../service/appwrite'; // ajuste o caminho
import { Client, Databases } from 'appwrite'; // se você estiver fora do contexto React

const client = new Client();
client.setEndpoint(process.env.APPWRITE_ENDPOINT).setProject(process.env.APPWRITE_PROJECT_ID).setKey(process.env.APPWRITE_API_KEY);

const database = new Databases(client);

const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
const PEDIDOS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PEDIDOS;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const paymentData = req.body;

  try {
    // Verifica o tipo de notificação
    if (paymentData.type === 'payment') {
      const paymentId = paymentData.data.id;

      const payment = await mercadopago.payment.findById(paymentId);

      if (payment.status === 'approved') {
        // Aqui você pode usar alguma lógica para encontrar o pedido correspondente
        // Por exemplo, salvar o ID do pedido como `external_reference` na preference

        const pedidoId = payment.external_reference;

        // Atualiza o status do pedido no Appwrite
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
