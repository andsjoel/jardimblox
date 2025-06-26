import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, signInWithEmailAndPassword } from '../../service/firebase'
import './admin.css'

const Admin = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErro(null)

    try {
      await signInWithEmailAndPassword(auth, email, senha)
      navigate('/painel') // ou outro caminho do admin
    } catch (err) {
      setErro('Credenciais inválidas.')
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

export default Admin
