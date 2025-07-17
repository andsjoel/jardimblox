import React, { useEffect, useState } from 'react';
import './produtos.css';
import { databases, storage, ID } from '../../service/appwrite';
import ProdutoCard from '../productCard/productCard';


const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: '', preco: '', estoque: '',
    imagem: null, descricao: ''
  });
  const [uploading, setUploading] = useState(false);
  const [isAdmin] = useState(true); // Para controle de acesso
  const [expandedCard, setExpandedCard] = useState(null); // Controla o card expandido
  const [editId, setEditId] = useState(null);

  const DATABASE_ID = '685ea6600023735f334e';
  const COLLECTION_ID = '685ea67f002bae8cf723';
  const BUCKET_ID = '685ea83a00220341283a';

  const fetchProdutos = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
      setProdutos(res.documents);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleCardClickOutside = () => {
    setExpandedCard(null);
  };

  const handleCardClick = (productId) => {
    setExpandedCard(prevId => (prevId === productId ? null : productId));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagem') {
      setForm(prev => ({ ...prev, imagem: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = '';

    if (form.imagem && typeof form.imagem !== 'string') {
      try {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), form.imagem);
        imageUrl = generateImageUrl(file.$id);
      } catch (uploadError) {
        console.error('Erro ao fazer upload da imagem:', uploadError);
        setUploading(false);
        return;
      }
    } else if (typeof form.imagem === 'string') {
      imageUrl = form.imagem; // já é a imagem antiga, mantém
    }

    try {
      if (editId) {
        // Atualizar produto existente
        await databases.updateDocument(
          DATABASE_ID,
          COLLECTION_ID,
          editId,
          {
            nome: form.nome,
            preco: parseFloat(form.preco.replace(',', '.')),
            estoque: Number(form.estoque),
            imagem: imageUrl || form.imagem, // mantém imagem existente se não for atualizada
            descricao: form.descricao
          }
        );
      } else {
        // Criar novo produto
        await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          ID.unique(),
          {
            nome: form.nome,
            preco: parseFloat(form.preco.replace(',', '.')),
            estoque: Number(form.estoque),
            imagem: imageUrl,
            descricao: form.descricao,
            criadoEm: new Date().toISOString()
          }
        );
      }

      console.log('Produto adicionado:', document);

      setForm({
        nome: '',
        preco: '',
        estoque: '',
        imagem: null,
        descricao: ''
      });
      setUploading(false);
      fetchProdutos();  // Recarrega a lista de produtos
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      setUploading(false);
    }

    setEditId(null);
  };

  const generateImageUrl = (fileId) => {
    const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io";
    const BUCKET_ID = "685ea83a00220341283a";
    const PROJECT_ID = "685de4f1000ea5dc2d4d";
    const MODE = "admin"; // Modo de acesso do arquivo

    return `${APPWRITE_ENDPOINT}/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}&mode=${MODE}`;
  };

  useEffect(() => {
    if (editId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [editId]);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = async (id) => {
    console.log('aaaa')
    const confirm = window.confirm('Tem certeza que deseja excluir este produto?');
    if (!confirm) return;

    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
        setProdutos(prev => prev.filter(prod => prod.$id !== id));
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
  };

  const handleEdit = (produto) => {
    console.log(produto.preco);

    setForm({
      nome: produto.nome || '',
      preco: produto.preco !== undefined && produto.preco !== null
        ? produto.preco.toFixed(2).replace('.', ',')
        : '',
      estoque: produto.estoque?.toString() || '',
      imagem: produto.imagem || null,
      descricao: produto.descricao || ''
    });
    setEditId(produto.$id);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 0);
  };

  const handlePrecoChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // remove tudo que não é número
    const floatValue = (Number(rawValue) / 100).toFixed(2); // divide por 100 para colocar vírgula

    const formatted = floatValue
      .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
      .replace('R$', '') // remove o R$ do campo, pode manter se quiser
      .trim();

    setForm(prev => ({
      ...prev,
      preco: formatted,
    }));
  };

  return (
    <div className="produtos-container">
      <h2>Cadastrar Produto</h2>

<form className="produto-form" onSubmit={handleSubmit}>
  <div className="form-wrapper">
    <div className="imagem-container">
      <label htmlFor="upload-imagem" className="custom-file-upload">
        Escolher Imagem
      </label>
      <input
        id="upload-imagem"
        type="file"
        name="imagem"
        accept="image/*"
        onChange={handleChange}
        required={!editId}
        className='input-modal'
      />
      <div className="preview-imagem">
        {form.imagem && (
          <img
            src={
              typeof form.imagem === 'string'
                ? form.imagem
                : URL.createObjectURL(form.imagem)
            }
            alt="Pré-visualização"
          />
        )}
      </div>
    </div>

    <div className="detalhes-produto">
      <input
        type="text"
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        required
        className='input-modal'
      />
      <input
        type="number"
        name="preco"
        placeholder="Preço"
        value={form.preco}
        onChange={handlePrecoChange}
        required
        className='input-modal'
      />
      <input
        type="number"
        name="estoque"
        placeholder="Estoque"
        value={form.estoque}
        onChange={handleChange}
        required
        className='input-modal'
      />
      <textarea
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
        required
        className='input-modal'
      />
    </div>
  </div>

  <div className="botao-wrapper">
    <button type="submit" disabled={uploading}>
      {uploading ? 'Salvando...' : editId ? 'Salvar Alterações' : 'Adicionar Produto'}
    </button>
  </div>
</form>


      <h2>Produtos Cadastrados</h2>
      {produtos.length === 0 ? (
        <p className="nenhum">Nenhum produto cadastrado.</p>
      ) : (
        <div className="lista-produtos-adm">
          {produtos.map(prod => (
            <ProdutoCard
              key={prod.$id}
              produto={prod}
              isAdmin={isAdmin}
              onClickOutside={handleCardClickOutside}
              isExpanded={expandedCard === prod.$id}
              onClick={() => handleCardClick(prod.$id)}
              onDelete={() => handleDelete(prod.$id)}
              onEdit={() => handleEdit(prod)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Produtos;
