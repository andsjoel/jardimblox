import React, { useEffect, useState } from 'react';
import { databases } from '../../service/appwrite';
import ProdutoCard from '../../components/productCard/productCard';
import LogoReduzida from '../../assets/logos/logo_reduzida.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './store.css';

const Store = () => {
  const [produtos, setProdutos] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState(''); // <- Novo estado para o filtro

  const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
  const PRODUCTS_COLLECTION_ID = process.env.REACT_APP_COLLECTION_PRODUTOS;

  const fetchProdutos = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, PRODUCTS_COLLECTION_ID);
      setProdutos(res.documents);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
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

    AOS.init({
      duration: 1000, // duração da animação em ms
      once: true,     // anima uma única vez ao entrar na viewport
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtro aplicado nos produtos com base no nome
  const produtosFiltrados = produtos.filter(prod =>
    prod.nome?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <div className="catalogo-container">
          <div className='filter'>
            <input
              type="text"
              placeholder="Procurar..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="filtro-input"
            />
          </div>

        {loading ? (
          <div className="loading-container">
            <img src={LogoReduzida} alt='logo reduzida rodando informando carregamento' />
          </div>
        ) : (
          <div className="lista-produtos-store">
            {produtosFiltrados.map(prod => (
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
