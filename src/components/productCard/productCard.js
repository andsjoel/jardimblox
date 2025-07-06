import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './product-card.css';

const ProdutoCard = ({ produto, isAdmin, onClickOutside, isExpanded, onClick, onDelete, onEdit }) => {
  const [isVisible, setIsVisible] = useState(isExpanded);

  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(isExpanded);
  }, [isExpanded]);

  return (
    <div
      className={`card-produto ${isExpanded ? 'expandido' : ''} ${isAdmin ? 'admin' : 'usuario'}`}
      onClick={onClick}
      onAnimationEnd={() => {
        if (!isVisible) {
          onClickOutside();  // Fechar card quando a animação terminar
        }
      }}
    >
      <img src={produto.imagem} alt={produto.nome} />
      <div className='name-price'>
        <h3>{produto.nome}</h3>
        <p className='preco'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(produto.preco)}
        </p>
      </div>
      {isAdmin && <p className="estoque">Estoque: {produto.estoque}</p>}

      {isVisible && (
        <div className="descricao-completa">
          {isAdmin && <p><strong>Descrição:</strong> {produto.descricao}</p>}
          {!isAdmin && (
            <button
              className="comprar-agora"
              onClick={(e) => {
                e.stopPropagation(); // para não expandir de novo
                navigate(`/produto/${produto.$id}`);
              }}
            >
              Comprar Agora
            </button>
          )}
          {isAdmin && (
            <div className="actions">
              <button className="editar" onClick={(e) => {
                e.stopPropagation(); // evita colapsar o card
                onEdit();
              }}>
                Editar
              </button>
              <button className="excluir" onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}>
                Excluir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProdutoCard;
