import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { account } from '../../service/appwrite'; // Certifique-se de importar o cliente Appwrite corretamente

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Tenta obter o usuário atual
        await account.get();
        setAuthenticated(true); // Se conseguir, o usuário está autenticado
      } catch (error) {
        setAuthenticated(false); // Se ocorrer erro, o usuário não está autenticado
      }
      setLoading(false); // Independente do resultado, já carregamos
    };

    checkAuthStatus(); // Verifica o status de autenticação

  }, []);

  if (loading) return <div>Carregando...</div>;

  // Se o usuário estiver autenticado, renderiza os filhos (componente protegido)
  // Caso contrário, redireciona para o /admin (ou página de login)
  return authenticated ? children : <Navigate to="/admin" />;
};

export default PrivateRoute;
