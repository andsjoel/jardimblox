import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { databases } from '../../service/appwrite'; // Serviço para pegar os dados da API
import { Query } from 'appwrite'; // Importando Query
import { FaPlus, FaMinus, FaTruck, FaShieldAlt, FaUndo, FaHeadset, FaCheckCircle } from 'react-icons/fa'
import './productDetail.css';
import Header from '../../components/header/Header';
import ModalCompra from '../../components/modalCompra/ModalCompra'; // Importando o ModalCompra
import LogoReduzida from '../../assets/logos/logo_reduzida.svg';

const ProductDetail = () => {
  const { id } = useParams();  // Obtém o ID do produto da URL
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1); // Estado para controlar a quantidade
  const [precoTotal, setPrecoTotal] = useState(0); // Estado para calcular o preço total
  const [showModal, setShowModal] = useState(false); // Controla a exibição do modal
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [isClienteExistente, setIsClienteExistente] = useState(false);
  const [pesquisando, setPesquisando] = useState(false); // Controla a exibição de "Pesquisando..."
  const [isEmailPesquisado, setIsEmailPesquisado] = useState(false); // Controla se o e-mail foi pesquisado
  const [loading, setLoading] = useState(false);
  const [clienteId, setClienteId] = useState(null);


  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
  const PEDIDOS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PEDIDOS;
  const PRODUCTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PRODUTOS;
  const CLIENTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_CLIENTS;

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
        setProduto(res);
        setPrecoTotal(res.preco);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    fetchProduto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

const iniciarCheckoutMercadoPago = async (pedidoId) => {
  
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: produto.nome,
        quantity: quantidade,
        price: produto.preco,
        pedidoId: pedidoId,
      }),
    });

    const data = await res.json();

    if (data.init_point) {
      window.location.href = data.init_point; // redireciona para o checkout do Mercado Pago
    } else {
      console.error('Resposta inválida da API:', data);
    }
  } catch (error) {
    console.error('Erro ao chamar API checkout:', error);
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
        setClienteId(cliente.$id)
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
    setLoading(true);

    let clienteIdLocal;

    if (!isClienteExistente) {
      // cria novo cliente
      const novoCliente = {
        email: email,
        nome: nome,
        celular: celular,
      };

      const resCliente = await databases.createDocument(
        DATABASE_ID,
        CLIENTS_COLLECTION_ID,
        'unique()',
        novoCliente
      );

      clienteIdLocal = resCliente.$id;
    } else {
      clienteIdLocal = clienteId;
      if (!clienteIdLocal) {
        console.error('ID do cliente não encontrado.');
        setLoading(false);
        return;
      }
    }

    // 4. Criar o pedido
    const pedido = {
      produto: id, // ID do produto que está na URL
      cliente: clienteIdLocal, // ID do cliente (novo ou existente)
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

      await iniciarCheckoutMercadoPago(resPedido.$id);
    } else {
      console.log('Estoque insuficiente para completar o pedido.');
      return;
    }

    // Confirmar que o pedido foi salvo com sucesso
    console.log('Pedido criado com sucesso:', resPedido);
    // Aqui, você pode também adicionar alguma lógica para fechar o modal ou mostrar um aviso ao usuário.

  } catch (error) {
    setLoading(false);
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

  useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);

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
    return <div className="loading-container">
              <img src={LogoReduzida} alt='logo reduzida rodando informando carregamento'/>
            </div>;
  }

  return (
    <section className='product-container'>
    <Header showBackButton />
    <div className="product-detail-container">

      <div className="product-image">
        <img src={produto.imagem} alt={produto.nome} />
      </div>
      <div className="product-info">
        <h2>{produto.nome}</h2>
        <p className="price">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(produto.preco*quantidade)}
        </p>

        {/* Botões de aumentar/diminuir a quantidade */}
        <div className="quantidade-controls">
          <button onClick={diminuirQuantidade}><FaMinus /></button>
          <span>{quantidade}</span>
          <button onClick={aumentarQuantidade}><FaPlus /></button>
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
          loading={loading}
          setLoading={setLoading}
        />
      )}
    </div>

      <div className="product-desc">
        <div className="info-item">
          <FaCheckCircle className="icon" />
          <div>
            <h4>Entrega Imediata</h4>
            <p>Após a confirmação do pagamento, o pet será entregue diretamente no jogo via troca (trade) no Roblox.</p>
          </div>
        </div>

        <div className="info-item">
          <FaShieldAlt className="icon" />
          <div>
            <h4>Compra Segura</h4>
            <p>Todo o processo é feito de forma segura, com proteção de dados e pagamento via Mercado Pago.</p>
          </div>
        </div>

        <div className="info-item">
          <FaUndo className="icon" />
          <div>
            <h4>Garantia de Troca</h4>
            <p>Se o pet entregue estiver diferente do anunciado, você pode solicitar a troca em até 7 dias.</p>
          </div>
        </div>

        <div className="info-item">
          <FaHeadset className="icon" />
          <div>
            <h4>Suporte Rápido</h4>
            <p>Nossa equipe está disponível para ajudar com dúvidas e agendar a entrega do seu pet no Roblox.</p>
          </div>
        </div>

        <div className="info-item">
          <FaTruck className="icon" />
          <div>
            <h4>100% Virtual</h4>
            <p>Este é um item virtual para o jogo Roblox – não há envio físico. Basta ter uma conta no jogo para receber.</p>
          </div>
        </div>
      </div>


    </section>
  );
};

export default ProductDetail;
