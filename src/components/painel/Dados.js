import { useEffect, useState } from 'react';
import { account } from '../../service/appwrite'; // Certifique-se de importar o client corretamente
import './dados.css';

const Dados = () => {
  const [user, setUser] = useState(null);
  const [appwriteInfo, setAppwriteInfo] = useState({
    endpoint: 'https://nyc.cloud.appwrite.io/v1',
    projectId: '685de4f1000ea5dc2d4d',
  });
  const [serverStatus, setServerStatus] = useState('Carregando...');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Função para verificar o status do servidor Appwrite
  const checkAppwriteStatus = async () => {
    try {
      await account.get();
      setServerStatus('Servidor OK');
    } catch (error) {
      if (error.code === 401) {
        setServerStatus('Servidor OK (usuário não autenticado)');
      } else {
        setServerStatus('Servidor indisponível');
      }
      console.error('Erro ao verificar Appwrite:', error);
    }
  };

  // Função para buscar os dados do usuário
  const getUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
      setIsAuthenticated(true); // Usuário autenticado
    } catch (error) {
      console.log('Erro ao obter dados do usuário:', error);
      setIsAuthenticated(false); // Usuário não autenticado
    }
  };

  useEffect(() => {
    // Verifica o status do servidor e os dados do usuário
    checkAppwriteStatus();
    getUser();

    // Atualiza as informações do Appwrite
    setAppwriteInfo({
      endpoint: 'https://nyc.cloud.appwrite.io/v1',
      projectId: '685de4f1000ea5dc2d4d',
    });
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="dados-container">
        <h2>Você não está autenticado!</h2>
        <p>Por favor, faça login para acessar seus dados.</p>
      </div>
    );
  }

  return (
    <div className="dados-container">
      <h2>Informações do Administrador</h2>

      {user ? (
        <div className="box-info">
          <p><strong>E-mail:</strong> {user.email}</p>
          <p><strong>UID:</strong> {user.$id}</p> {/* ID do usuário no Appwrite */}
        </div>
      ) : (
        <p>Carregando dados do usuário...</p>
      )}

      <h2>Informações do Appwrite</h2>
      <div className="box-info">
        <p><strong>Endpoint:</strong> {appwriteInfo.endpoint}</p>
        <p><strong>Project ID:</strong> {appwriteInfo.projectId}</p>
      </div>

      <h2>Status do Servidor</h2>
      <div className="box-info">
        <p><strong>Status do Servidor:</strong> {serverStatus}</p>
      </div>
    </div>
  );
};

export default Dados;
