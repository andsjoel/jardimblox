import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaDiscord, FaHome, FaStore, FaComments, FaShoppingCart } from 'react-icons/fa';
import './header.css';

const Header = () => {
    const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <h1 className="logo">Jardim Blox</h1>

<nav className="nav">
  <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
    <FaHome className="nav-icon" />
    <span>Início</span>
  </NavLink>

  <NavLink to="/loja" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
    <FaStore className="nav-icon" />
    <span>Loja</span>
  </NavLink>

  <NavLink to="/chat" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
    <FaComments className="nav-icon" />
    <span>Chat</span>
  </NavLink>

  <NavLink to="/carrinho" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
    <FaShoppingCart className="nav-icon" />
    <span>Carrinho</span>
  </NavLink>
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
