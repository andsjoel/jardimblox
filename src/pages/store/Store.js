import React, { useEffect, useState } from 'react';
import { databases } from '../../service/appwrite';
import ProdutoCard from '../../components/productCard/productCard';
import './store.css';
import Header from '../../components/header/Header';

const Store = () => {
  const [produtos, setProdutos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const DATABASE_ID = '685ea6600023735f334e';
  const COLLECTION_ID = '685ea67f002bae8cf723';

  const fetchProdutos = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setProdutos(res.documents);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false); // Definir loading como false quando a requisição terminar
    }
  };

  const handleCardClickOutside = () => {
    setExpandedCard(null);
  };

  const handleCardClick = (id) => {
    setExpandedCard(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return (
    <div className="catalogo-container">
      <Header />
      
      <h1>Catálogo</h1>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div> {/* Coloque aqui um spinner ou animação de carregamento */}
          <p>Carregando produtos...</p>
        </div>
      ) : (
        <div className="lista-produtos">
          {produtos.map(prod => (
            <ProdutoCard
              key={prod.$id}
              produto={prod}
              isAdmin={false}
              isExpanded={expandedCard === prod.$id}
              onClick={() => handleCardClick(prod.$id)}
              onClickOutside={handleCardClickOutside}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Store;
