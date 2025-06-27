import { FaSignOutAlt } from 'react-icons/fa'; // Ícone de logout do FontAwesome
import { account } from '../../service/appwrite'; // Importando a instância do Appwrite
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ setAbaAtiva, abaAtiva }) => {
  const navigate = useNavigate(); // Hook para navegação

  // Função de logout
  const handleLogout = async () => {
    try {
      // Supondo que você faça o logout com o Appwrite
      await account.deleteSession('current');
      
      // Redireciona para a página de login ou para /admin
      navigate('/admin'); // Redirecionando para a página /admin
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  return (
    <aside className="sidebar">
      <h2>Painel</h2>
      <ul>
        <li
          className={abaAtiva === 'dados' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('dados')}
        >
          Dados
        </li>
        <li
          className={abaAtiva === 'produtos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('produtos')}
        >
          Produtos
        </li>
        <li
          className={abaAtiva === 'pedidos' ? 'ativo' : ''}
          onClick={() => setAbaAtiva('pedidos')}
        >
          Pedidos
        </li>
      </ul>

      {/* Ícone de logout */}
      <div className="logout" onClick={handleLogout}>
        <FaSignOutAlt size={24} />
        <span>Sair</span>
      </div>
    </aside>
  );
};

export default Sidebar;
