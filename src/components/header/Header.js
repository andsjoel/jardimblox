import './header.css'
import { FaDiscord, FaHome, FaStore, FaComments, FaShoppingCart } from 'react-icons/fa'

const Header = () => {
  return (
    <>
      <header className="header">
        <h1 className="logo">Jardim Blox</h1>

        <nav className="nav">
            <a href="/" className="nav-item">
            <FaHome className="nav-icon" />
            <span>Início</span>
            </a>
            <a href="/loja" className="nav-item">
            <FaStore className="nav-icon" />
            <span>Loja</span>
            </a>
            <a href="/chat" className="nav-item">
            <FaComments className="nav-icon" />
            <span>Chat</span>
            </a>
            <a href="/carrinho" className="nav-item">
            <FaShoppingCart className="nav-icon" />
            <span>Carrinho</span>
            </a>
        </nav>

        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="discord-button"
        >
          <FaDiscord className="icon" />
          <span>Entrar no Discord</span>
        </a>
      </header>
    </>
  )
}

export default Header
