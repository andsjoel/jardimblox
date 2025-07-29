import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './painel.css'
import Dados from '../../components/painel/Dados'
import Produtos from '../../components/painel/Produtos'
import Pedidos from '../../components/painel/Pedidos'
import Sidebar from '../../components/painel/Sidebar'
import { account } from '../../service/appwrite'

const Painel = () => {
  const [abaAtiva, setAbaAtiva] = useState('dados')
  const [tempoInatividade, setTempoInatividade] = useState(0) // Controle do tempo de inatividade
  const navigate = useNavigate()

  // Função para realizar o logout
  const logout = async () => {
    try {
      await account.deleteSession('current') // Deleta a sessão do usuário
      navigate('/admin') // Redireciona para a tela de login
    } catch (error) {
      console.log('Erro ao fazer logout:', error)
    }
  }

  // Função para resetar o tempo de inatividade
  const resetInatividade = () => {
    setTempoInatividade(0) // Reseta o contador de tempo de inatividade
  }

  // Efeito para monitorar o tempo de inatividade
  useEffect(() => {
    // Função que verifica o tempo de inatividade
    const interval = setInterval(() => {
      setTempoInatividade(prev => prev + 1) // Incrementa a cada segundo
    }, 1000)

    // Logout automático após 1 hora de inatividade (3600 segundos)
    if (tempoInatividade >= 480) {
      logout() // Realiza o logout
      clearInterval(interval) // Limpa o intervalo após o logout
    }

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempoInatividade])

  useEffect(() => {
    const eventos = ['click', 'mousemove', 'keydown']
    const resetTimeout = () => resetInatividade()

    // Adiciona os eventos para resetar o contador
    eventos.forEach(evento => {
      window.addEventListener(evento, resetTimeout)
    })

    // Remove os eventos ao desmontar o componente
    return () => {
      eventos.forEach(evento => {
        window.removeEventListener(evento, resetTimeout)
      })
    }
  }, [])

  return (
    <div className="painel-wrapper">
      <Sidebar setAbaAtiva={setAbaAtiva} abaAtiva={abaAtiva} />

      <div className="painel-conteudo">
        {abaAtiva === 'dados' && <Dados />}
        {abaAtiva === 'produtos' && <Produtos />}
        {abaAtiva === 'pedidos' && <Pedidos />}
      </div>
    </div>
  )
}

export default Painel
