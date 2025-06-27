import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';
import { account } from '../../service/appwrite';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(email, senha);
      navigate('/admin/painel');
      
    } catch (error) {
      setErro('Credenciais inválidas.');
      console.log(error);
      
    }

  }

  return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleLogin}>
        <h2>Área Administrativa</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Acessar</button>
      </form>
    </div>
  )
}

export default Admin;
