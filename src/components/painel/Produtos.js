import { useEffect, useState } from 'react';
import './produtos.css';
import { databases, storage, ID } from '../../service/appwrite';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    nome: '', preco: '', estoque: '',
    imagem: null, descricaoCurta: '', descricaoCompleta: ''
  });
  const [uploading, setUploading] = useState(false);

  const DATABASE_ID = '685ea6600023735f334e';
  const COLLECTION_ID = '685ea67f002bae8cf723';
  const BUCKET_ID = '685ea83a00220341283a';

const fetchProdutos = async () => {
  try {
    // Certifique-se de que a ID do banco de dados e da coleção estejam corretas
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    setProdutos(res.documents);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

  useEffect(() => {
    fetchProdutos();
  }, []);

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

  if (form.imagem) {
    try {
      // Cria o arquivo no Appwrite Storage
      const file = await storage.createFile(BUCKET_ID, ID.unique(), form.imagem);
      console.log('Arquivo carregado com sucesso:', file);

      // Gera a URL da imagem dinamicamente
      imageUrl = generateImageUrl(file.$id);
      console.log('URL da Imagem gerada:', imageUrl);
    } catch (uploadError) {
      console.error('Erro ao fazer upload da imagem:', uploadError);
      setUploading(false);
      return;
    }
  }

  // Adiciona o produto ao banco de dados
  try {
    const document = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(), // ID único do produto
      {
        nome: form.nome,
        preco: Number(form.preco),
        estoque: Number(form.estoque),
        imagem: imageUrl, // Salva a URL gerada
        descricaoCurta: form.descricaoCurta,
        descricaoCompleta: form.descricaoCompleta,
        criadoEm: new Date().toISOString()
      }
    );
    console.log('Produto adicionado:', document);

    // Limpa o formulário após o sucesso
    setForm({
      nome: '',
      preco: '',
      estoque: '',
      imagem: null,
      descricaoCurta: '',
      descricaoCompleta: ''
    });

    setUploading(false);
    fetchProdutos();  // Recarrega a lista de produtos
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    setUploading(false);
  }
};

const generateImageUrl = (fileId) => {
  const APPWRITE_ENDPOINT = "https://nyc.cloud.appwrite.io"; // Endpoint correto
  const BUCKET_ID = "685ea83a00220341283a"; // ID do bucket
  const PROJECT_ID = "685de4f1000ea5dc2d4d"; // ID do projeto
  const MODE = "admin"; // Ou "admin", dependendo do acesso desejado

  return `${APPWRITE_ENDPOINT}/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}&mode=${MODE}`;
};



  return (
    <div className="produtos-container">
      <h2>Adicionar Novo Produto</h2>

      <form className="produto-form" onSubmit={handleSubmit}>
        <input
          type="text" name="nome" placeholder="Nome"
          value={form.nome} onChange={handleChange} required
        />
        <input
          type="number" name="preco" placeholder="Preço"
          value={form.preco} onChange={handleChange} required
        />
        <input
          type="number" name="estoque" placeholder="Estoque"
          value={form.estoque} onChange={handleChange} required
        />
        <input
          type="file" name="imagem" accept="image/*"
          onChange={handleChange} required
        />
        <input
          type="text" name="descricaoCurta" placeholder="Descrição Curta"
          value={form.descricaoCurta} onChange={handleChange} required
        />
        <textarea
          name="descricaoCompleta" placeholder="Descrição Completa"
          value={form.descricaoCompleta} onChange={handleChange} required
        />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Enviando...' : 'Adicionar Produto'}
        </button>
      </form>

      <h2>Produtos Cadastrados</h2>
      {produtos.length === 0 ? (
        <p className="nenhum">Nenhum produto cadastrado.</p>
      ) : (
        <div className="lista-produtos">
          {produtos.map(prod => (
            <div key={prod.$id} className="card-produto">
              <img src={prod.imagem} alt={prod.nome} />
              <h3>{prod.nome}</h3>
              <p><strong>Preço:</strong> R$ {prod.preco}</p>
              <p><strong>Estoque:</strong> {prod.estoque}</p>
              <p><strong>Curta:</strong> {prod.descricaoCurta}</p>
              <details>
                <summary>Ver Descrição Completa</summary>
                <p>{prod.descricaoCompleta}</p>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Produtos;
