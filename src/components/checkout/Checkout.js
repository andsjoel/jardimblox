import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Checkout = ({ produto }) => {
  const [preference, setPreference] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Configura a preferência de pagamento do Mercado Pago
    const createPreference = async () => {
      try {
        const response = await fetch('/api/create_preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                title: produto.nome,
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(produto.preco.replace('R$', '').replace(',', '.')),
              },
            ],
          }),
        });
        const data = await response.json();
        setPreference(data.preferenceId);
      } catch (error) {
        console.error('Erro ao criar a preferência:', error);
      }
    };

    createPreference();
  }, [produto]);

  useEffect(() => {
    if (preference) {
      // Carregar o SDK do Mercado Pago
      const script = document.createElement('script');
      script.src = `https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js`;
      script.onload = () => {
        window.Mercadopago.setPublishableKey('TEST-1234567890'); // Coloque a chave pública de teste do Mercado Pago
        window.Mercadopago.checkout({
          preference: {
            id: preference,
          },
          autoOpen: true,
        });
      };
      document.body.appendChild(script);
    }
  }, [preference]);

  return (
    <div className="checkout-container">
      <h2>Finalizar Compra</h2>
      <p><strong>{produto.nome}</strong></p>
      <p>Preço: {produto.preco}</p>
      {preference ? (
        <Button onClick={() => navigate('/')} variant="success">Voltar para a loja</Button>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default Checkout;
