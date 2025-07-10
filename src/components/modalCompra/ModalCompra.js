// import React, { useState, useEffect } from 'react';
import LogoReduzida from '../../assets/logos/logo_reduzida.svg';
import { AiFillCloseCircle } from "react-icons/ai";


import './modalcompra.css';  // Importe o CSS se necessário
import { useEffect, useState } from 'react';

const ModalCompra = ({
  email,
  setEmail,
  nome,
  setNome,
  celular,
  setCelular,
  isEmailPesquisado,
  isClienteExistente,
  pesquisando,
  quantidade,
  precoTotal,
  produto,
  buscarCliente,
  salvarCliente,
  cancelar,
  loading,
  setLoading
}) => {
    const [isValid, setIsValid] = useState(false)
  
  // Função para validar se os campos obrigatórios estão preenchidos e com formato correto
    useEffect(() => {
      const isNomeValid = nome.length >= 3;
      const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
      const isCelularValid = celular.replace(/\D/g, '').length === 11;

      if (isClienteExistente && isEmailPesquisado) {
        setIsValid(true);
      } else if (isNomeValid && isEmailValid && isCelularValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }, [nome, email, celular, isClienteExistente, isEmailPesquisado]);

  // Função para validar e aceitar apenas letras no nome
  const handleNomeChange = (e) => {
    // Expressão regular que permite apenas letras e espaços
    const regex = /^[a-zA-ZÀ-ÿ\s]*$/; 
    const value = e.target.value;
    
    // Se o valor for válido (somente letras e espaços), atualiza o estado
    if (regex.test(value) || value === '') {
      setNome(value);
    }
  };

  // Função para formatar o celular enquanto o usuário digita
  const handleCelularChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    // Verifica se o número tem 11 dígitos e formata o celular
    if (value.length <= 11) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 3) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else if (value.length <= 9) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7, 11)}`;
      }
    }

    setCelular(value); // Atualiza o estado com o valor formatado
  };

  // Função para buscar o cliente, agora com validação do e-mail
  const handleBuscarCliente = () => {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }
    buscarCliente(email); // Se o e-mail for válido, chama a função de busca
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className='modal-header'>
          <button onClick={cancelar}><AiFillCloseCircle /></button>
        </div>
        <h3>Confirmação do Pedido</h3>

        {/* Campo de E-mail */}
        {!isEmailPesquisado && (
          <>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button className='modal-confirm' onClick={handleBuscarCliente}>Continuar</button>
          </>
        )}

        {/* Mensagem "Pesquisando..." enquanto busca os dados */}
        {pesquisando && <h3>Pesquisando...</h3>}

        {/* Mostrar o e-mail digitado após a pesquisa */}
        {isEmailPesquisado && !pesquisando && (
          <>
            <input
              type="text"
              value={email}
              readOnly
              disabled
            />
            <h3>E-mail confirmado!</h3>
          </>
        )}

        {/* Campos de Nome e Celular aparecem após o e-mail ser pesquisado */}
        {isEmailPesquisado && (
          <>
            {isClienteExistente ? (
              <>
                <input
                  type="text"
                  value={nome}
                  disabled
                />
                <input
                  type="text"
                  value={celular}
                  disabled
                />
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={handleNomeChange} // Atualiza nome com validação
                  required
                />
                <input
                  type="text"
                  placeholder="Digite seu celular"
                  value={celular}
                  onChange={handleCelularChange} // Atualiza celular com formatação
                  required
                />
              </>
            )}

            <div className="pedido-resumo-modal">
              <p><strong>Resumo do Pedido:</strong></p>
              <p>{quantidade}x {produto.nome}</p>
              <p>Total: {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(precoTotal)}</p>
            </div>

            <div className="modal-buttons">
              {/* Desabilita o botão de "Confirmar" até que todos os campos estejam preenchidos e válidos */}
              <button className='modal-confirm' onClick={salvarCliente} disabled={!isValid}>
                {loading ? (
                  <span className='spinner'></span>
                ) : (
                  'Confirmar'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalCompra;
