import { useState } from 'react'
import './painel.css'
import Dados from '../../components/painel/Dados'
import Produtos from '../../components/painel/Produtos'
import Pedidos from '../../components/painel/Pedidos'
import Sidebar from '../../components/painel/Sidebar'

const Painel = () => {
  const [abaAtiva, setAbaAtiva] = useState('dados')

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
