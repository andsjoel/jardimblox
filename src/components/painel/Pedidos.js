import React, { useState, useEffect } from 'react';
import { databases } from '../../service/appwrite'; // Serviço para pegar os dados da API
import { Query } from 'appwrite'; // Importando Query
import { FaCheck, FaSearch, FaTrash } from 'react-icons/fa'; // Ícones de "check" e "search"
import './pedidos.css';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]); // Estado para armazenar os pedidos
  const [email, setEmail] = useState(''); // Estado para armazenar o email da pesquisa
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]); // Estado para armazenar os pedidos filtrados
  const [produtos, setProdutos] = useState({}); // Para armazenar os produtos com base no ID
  const [clientes, setClients] = useState([]); // Alterado para um array

  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
  const PEDIDOS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PEDIDOS;
  const PRODUCTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PRODUTOS;
  const CLIENTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_CLIENTS;

  // Função para buscar os pedidos
  const fetchPedidos = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, PEDIDOS_COLLECTION_ID);
      setPedidos(res.documents);
      setPedidosFiltrados(res.documents); // Inicializa os pedidos filtrados com todos os pedidos
      fetchProdutos(res.documents);
      
      const clients = await databases.listDocuments(DATABASE_ID, CLIENTS_COLLECTION_ID);
      setClients(clients.documents); // Armazenando os clientes corretamente como array
      
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Função para buscar os produtos com base no ID dos pedidos
  const fetchProdutos = async (pedidos) => {
    try {
      const productIds = [...new Set(pedidos.map((pedido) => pedido.produto))]; // IDs únicos dos produtos
      const res = await Promise.all(
        productIds.map(async (id) => {
          const produto = await databases.getDocument(DATABASE_ID, PRODUCTS_COLLECTION_ID, id);
          
          return { id, nome: produto.nome }; // Armazena o nome do produto com seu ID
        })
      );

      const produtosMap = res.reduce((acc, produto) => {
        acc[produto.id] = produto.nome;
        return acc;
      }, {});
      setProdutos(produtosMap);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  // Função para buscar o ID do cliente com base no e-mail
  const buscarClientePorEmail = async (email) => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, CLIENTS_COLLECTION_ID, [
        Query.equal('email', email),
      ]);

      if (res.documents.length > 0) {
        return res.documents[0].$id; // Retorna o ID do cliente
      } else {
        console.log('Cliente não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar cliente por email:', error);
      return null;
    }
  };

  

  // Função para buscar o e-mail do cliente pelo clienteId
  const buscarEmailCliente = (clienteId) => {
    try {
      const cliente = clientes.find(cliente => cliente.$id === clienteId);
      
      if (cliente) {
        return cliente.email; // Retorna o e-mail do cliente
      } else {
        console.log('Cliente não encontrado.');
        return 'E-mail não encontrado';
      }
    } catch (error) {
      console.error('Erro ao buscar e-mail do cliente:', error);
      return '';
    }
  };

  // Função para determinar a classe de cor do status
  const getStatusClass = (status) => {
    if (status === 'Em processamento...') {
      return 'status-processando'; // Azul claro
    } else if (status === 'Produto Entregue') {
      return 'status-entregue'; // Verde claro
    } else {
      return 'status-outro'; // Vermelho claro
    }
  };

  // Função para filtrar os pedidos pelo e-mail
  const buscarPedidosPorEmail = async () => {
    if (email === '') {
      setPedidosFiltrados(pedidos); // Se o email estiver vazio, mostra todos os pedidos
    } else {
      const clienteId = await buscarClientePorEmail(email);

      if (clienteId) {
        const pedidosFiltrados = pedidos.filter((pedido) => pedido.cliente === clienteId);
        setPedidosFiltrados(pedidosFiltrados); // Filtra os pedidos pelo ID do cliente
      } else {
        setPedidosFiltrados([]); // Se não encontrar cliente, não mostra pedidos
      }
    }
  };

  // Função para atualizar o status do pedido para "Produto Entregue"
  const marcarComoEntregue = async (pedidoId, nomeProduto, quantidade) => {
    const confirmar = window.confirm(`Deseja realmente marcar como entregue o pedido ${nomeProduto} (${quantidade})?`);
    if (!confirmar) return;

    try {
      const pedido = pedidosFiltrados.find(pedido => pedido.$id === pedidoId);

      if (pedido) {
        await databases.updateDocument(
          DATABASE_ID,
          PEDIDOS_COLLECTION_ID,
          pedidoId,
          { status: 'Produto Entregue' }
        );
        setPedidosFiltrados(prevPedidos =>
          prevPedidos.map(p =>
            p.$id === pedidoId ? { ...p, status: 'Produto Entregue' } : p
          )
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
    }
  };

  const excluirPedido = async (pedidoId, nomeProduto, quantidade) => {
    const confirmar = window.confirm(`Deseja realmente excluir o pedido ${nomeProduto} (${quantidade})?`);
    if (!confirmar) return;

    try {
      await databases.deleteDocument(DATABASE_ID, PEDIDOS_COLLECTION_ID, pedidoId);
      // Atualiza o estado local para remover o pedido excluído
      setPedidosFiltrados(prevPedidos => prevPedidos.filter(p => p.$id !== pedidoId));
      setPedidos(prevPedidos => prevPedidos.filter(p => p.$id !== pedidoId));
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
    }
  };

  // Effect para carregar os pedidos ao carregar o componente
  useEffect(() => {
    fetchPedidos();
  }, []);

  return (
    <div className="pedidos-container">
      <h1>Pedidos</h1>

      {/* Barra de pesquisa com botão */}
      <div className="search-bar">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
          placeholder="Buscar por e-mail"
        />
        <button onClick={buscarPedidosPorEmail} className="search-button">
          <FaSearch /> {/* Ícone de pesquisa */}
        </button>
      </div>

      {/* Tabela de pedidos */}
      <table className="pedidos-table">
        <thead>
          <tr>
            <th>Email do Cliente</th>
            <th>Nome do Produto</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th>Status</th>
            <th>Pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidosFiltrados.map((pedido) => (
            <tr key={pedido.$id}>
              <td>{buscarEmailCliente(pedido.cliente)}</td>
              <td>{produtos[pedido.produto] || 'Carregando...'}</td>
              <td>{pedido.quantidade}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(pedido.total)}
              </td>
              <td className={getStatusClass(pedido.status)}>{pedido.status}</td>
              <td>
                {pedido.status !== 'Produto Entregue' ? (
                  <>
                    <FaCheck
                      onClick={() => marcarComoEntregue(pedido.$id, produtos[pedido.produto], pedido.quantidade)}
                      style={{ cursor: 'pointer', color: 'green', fontSize: '20px', marginRight: '8px' }}
                      title="Marcar como entregue"
                    />
                    <FaTrash
                      onClick={() => excluirPedido(pedido.$id, produtos[pedido.produto], pedido.quantidade)}
                      style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
                      title="Excluir pedido"
                    />
                  </>
                ) : (
                  <FaTrash
                    onClick={() => excluirPedido(pedido.$id, produtos[pedido.produto], pedido.quantidade)}
                    style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }}
                    title="Excluir pedido"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedidos;
