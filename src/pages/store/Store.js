import React, { useEffect, useState } from 'react';
import { databases } from '../../service/appwrite';
import ProdutoCard from '../../components/productCard/productCard';
import './store.css';
import bgStore from '../../assets/images/background/background_store.png'
import Header from '../../components/header/Header';
import LogoReduzida from '../../assets/logos/logo_reduzida.svg';


const Store = () => {
  const [produtos, setProdutos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
  const PRODUCTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PRODUTOS;

  const fetchProdutos = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
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
    <>
    <Header />
    <div className="catalogo-container">
      <div className="store-banner-container">
        <img src={bgStore} alt="Banner da loja" className="store-banner" />
        {/* <h2 className='catalogo-title'>LOJA</h2> */}
      </div>      

        {loading ? (
          <div className="loading-container">
            <img src={LogoReduzida} alt='logo reduzida rodando informando carregamento'/>
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
    </>
  );
};

export default Store;
