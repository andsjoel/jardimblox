import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import IconLogo from '../../assets/logos/logo_reduzida.svg'
import './product-card.css';

const ProdutoCard = ({ produto, isAdmin, onClick, onDelete, onEdit }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`card-produto ${isAdmin ? 'admin' : 'usuario'}`}
      onClick={onClick}
    >
      <img className='product-icon' src={IconLogo} alt='icone da jardim blox sobre a foto' />
      <img className='product-img' src={produto.imagem} alt={produto.nome} />
      <div className='name-price'>
        <h3>{produto.nome}</h3>
        <p className='desconto'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(produto.preco + 10.99)}
        </p>
        <p className='preco'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(produto.preco)}
        </p>
      </div>
      {isAdmin && <p className="estoque">Estoque: {produto.estoque}</p>}
      {!isAdmin && (
      <button
        className="comprar-agora"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/produto/${produto.$id}`);
        }}
      >
        <FaShoppingCart style={{ marginRight: '8px' }} />
        Comprar Agora
      </button>
      )}

      {isAdmin && (
        <div className="descricao">
          <div className="actions">
            <button className="editar" onClick={(e) => {
              e.stopPropagation();
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </div>
      )}
    </div>
  );
};

export default ProdutoCard;
