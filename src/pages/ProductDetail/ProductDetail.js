import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { databases } from '../../service/appwrite'; // Serviço para pegar os dados da API
import { Query } from 'appwrite'; // Importando Query
import './productDetail.css';
import Header from '../../components/header/Header';
import ModalCompra from '../../components/modalCompra/ModalCompra'; // Importando o ModalCompra

const ProductDetail = () => {
  const { id } = useParams();  // Obtém o ID do produto da URL
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1); // Estado para controlar a quantidade
  const [precoTotal, setPrecoTotal] = useState(0); // Estado para calcular o preço total
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [isClienteExistente, setIsClienteExistente] = useState(false);
  const [historicoPedidos, setHistoricoPedidos] = useState([]);
  const [pesquisando, setPesquisando] = useState(false); // Controla a exibição de "Pesquisando..."
  const [isEmailPesquisado, setIsEmailPesquisado] = useState(false); // Controla se o e-mail foi pesquisado


  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
  const PEDIDOS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PEDIDOS;
  const PRODUCTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PRODUTOS;
  const CLIENTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_CLIENTS;

  // Função para buscar o produto com base no ID
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
        setProduto(res);
        setPrecoTotal(res.preco); // Define o preço total inicial com o preço do produto
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduto();
  }, [id]);

    // Função que chama a API backend para criar preferência Mercado Pago
  const iniciarCheckoutMercadoPago = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: produto.nome,
          quantity: quantidade,
          price: produto.preco
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redireciona o usuário para a URL do Mercado Pago
        window.location.href = data.init_point;
      } else {
        alert('Erro ao iniciar pagamento: ' + (data.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao chamar API checkout:', error);
      alert('Erro ao iniciar pagamento');
    }
  };

  // Função para buscar cliente por e-mail
  const buscarCliente = async (email) => {
    setPesquisando(true); // Ativa a pesquisa
    try {
      const res = await databases.listDocuments(DATABASE_ID, CLIENTS_COLLECTION_ID, [
        Query.equal('email', email)
      ]);

      if (res.documents.length > 0) {
        const cliente = res.documents[0];
        setIsClienteExistente(true);
        setNome(cliente.nome);
        setCelular(cliente.celular);
        setHistoricoPedidos(cliente.pedidos || []);
      } else {
        setIsClienteExistente(false);
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
    } finally {
      setPesquisando(false); // Desativa a pesquisa
      setIsEmailPesquisado(true); // Marca que o e-mail foi pesquisado
    }
  };

  // Função para salvar ou atualizar cliente e pedidos
const salvarCliente = async () => {
  try {
    // 1. Verificar se o cliente já existe
    let clienteId;

    if (!isClienteExistente) {
      // 2. Se o cliente não existir, cria um novo cliente
      const novoCliente = {
        email: email,
        nome: nome,
        celular: celular,
      };

      const resCliente = await databases.createDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        'unique()', // ID único gerado automaticamente
        novoCliente
      );

      clienteId = resCliente.$id; // Pega o ID do novo cliente
    } else {
      // 3. Se o cliente já existir, usamos o ID do cliente encontrado
      if (historicoPedidos.length > 0 && historicoPedidos[0].cliente) {
        clienteId = historicoPedidos[0].cliente.$id; // Acessa o ID do cliente
      } else {
        // Se o histórico de pedidos não tiver dados ou o cliente não for encontrado, falha a criação do pedido
        console.log('Cliente não encontrado no histórico.');
        return;
      }
    }

    // 4. Criar o pedido
    const pedido = {
      produto: id, // ID do produto que está na URL
      cliente: clienteId, // ID do cliente (novo ou existente)
      quantidade: quantidade,
      total: precoTotal,
      status: 'Em processamento...',
    };

    const resPedido = await databases.createDocument(
      DATABASE_ID,
      PEDIDOS_COLLECTION_ID,
      'unique()', // ID único para o pedido
      pedido
    );

    // 5. Atualizar o estoque do produto (opcional)
    if (produto.estoque >= quantidade) {
      const novoEstoque = produto.estoque - quantidade;
      
      // Atualizar o estoque do produto na coleção
      await databases.updateDocument(
        DATABASE_ID,
        PRODUCTS_COLLECTION_ID,
        produto.$id, // ID do produto
        { estoque: novoEstoque }
      );

      await iniciarCheckoutMercadoPago();
    } else {
      console.log('Estoque insuficiente para completar o pedido.');
      return;
    }

    // Confirmar que o pedido foi salvo com sucesso
    console.log('Pedido criado com sucesso:', resPedido);
    // Aqui, você pode também adicionar alguma lógica para fechar o modal ou mostrar um aviso ao usuário.

  } catch (error) {
    console.error('Erro ao salvar cliente ou criar pedido:', error);
  }
};



  // Função para aumentar a quantidade
  const aumentarQuantidade = () => {
    setQuantidade(prev => prev + 1);
  };

  // Função para diminuir a quantidade
  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

  // Atualiza o preço total com base na quantidade
  useEffect(() => {
    if (produto) {
      setPrecoTotal(produto.preco * quantidade);
    }
  }, [quantidade, produto]);

  // Função para limpar os dados ao cancelar
  const cancelar = () => {
    setEmail(''); // Limpa o e-mail
    setNome(''); // Limpa o nome
    setCelular(''); // Limpa o celular
    setShowModal(false); // Fecha o modal
    setIsEmailPesquisado(false); // Reseta o estado da pesquisa do e-mail
    setIsClienteExistente(false); // Reseta a existência do cliente
    setPesquisando(false); // Reseta o estado de pesquisa
  };

  // Se o produto não for encontrado ou estiver carregando
  if (!produto) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="product-detail-container">
      <Header />

      <div className="product-image">
        <img src={produto.imagem} alt={produto.nome} />
      </div>
      <div className="product-info">
        <h1>{produto.nome}</h1>
        <p className="price">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(produto.preco)}
        </p>

        {/* Botões de aumentar/diminuir a quantidade */}
        <div className="quantidade-controls">
          <button onClick={diminuirQuantidade}>-</button>
          <span>{quantidade}</span>
          <button onClick={aumentarQuantidade}>+</button>
        </div>

        <button onClick={() => setShowModal(true)} className="comprar-agora">Comprar Agora</button>
      </div>

      {showModal && (
        <ModalCompra
          email={email}
          setEmail={setEmail}
          nome={nome}
          setNome={setNome}
          celular={celular}
          setCelular={setCelular}
          isEmailPesquisado={isEmailPesquisado}
          isClienteExistente={isClienteExistente}
          pesquisando={pesquisando}
          quantidade={quantidade}
          precoTotal={precoTotal}
          produto={produto}
          buscarCliente={buscarCliente}
          salvarCliente={salvarCliente}
          cancelar={cancelar}
        />
      )}
    </div>
  );
};

export default ProductDetail;
