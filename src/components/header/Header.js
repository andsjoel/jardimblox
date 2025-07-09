import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaDiscord, FaStore, FaUserFriends  } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

import LogoPrincipal from '../../assets/logos/logo_principal.svg';
import LogoReduzida from '../../assets/logos/logo_reduzida.svg';

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
        <img src={LogoPrincipal} alt="Jardim Blox logo" className="logo" />

      <nav className="nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <AiFillHome className="nav-icon" />
          <span>Início</span>
        </NavLink>

        <NavLink to="/loja" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaStore className="nav-icon" />
          <span>Loja</span>
        </NavLink>

        <NavLink to="/comunidade" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaUserFriends className="nav-icon" />
          <span>Comunidade</span>
        </NavLink>

        {/* <NavLink to="/client" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaUserAlt  className="nav-icon" />
          <span>Minhas Compras</span>
        </NavLink> */}
      </nav>

        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="discord-button b"
        >
          <FaDiscord className="icon" />
          <span>Entrar no Discord</span>
        </a>
      </header>
      
    </>
  )
}

export default Header
