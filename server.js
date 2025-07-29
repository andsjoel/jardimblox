// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para o frontend React
app.use(cors());

// Parse JSON do corpo da requisição
app.use(express.json());

// Rota para o seu webhook
app.post('/api/mercadoPagoWebhook', (req, res) => {
  console.log('[WEBHOOK] Notificação recebida:', req.body);
  // Aqui você pode processar o pagamento, atualizar o banco, etc.
  res.status(200).send('Status atualizado');
});

// Iniciar o servidor na porta 5000 (ou qualquer outra porta de sua escolha)
app.listen(5000, () => {
  console.log('Servidor backend rodando em http://localhost:5000');
});
