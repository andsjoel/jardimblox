import { useEffect, useState } from 'react';
import { FaDiscord, FaStore } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import LogoSticker from '../../assets/logos/logo_sticker.svg'

import './header.css';

const Header = ({ activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);

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
        <nav className="nav">
          <button
            className={`nav-item ${activeTab === "community" ? "active" : ""}`}
            onClick={() => setActiveTab("community")}
            aria-label="Início"
          >
            <AiFillHome className='nav-icon' size={24} />
            <span>Início</span>
          </button>

          <button
            className={`nav-item ${activeTab === "store" ? "active" : ""}`}
            onClick={() => setActiveTab("store")}
            aria-label="Partidas"
          >
            <FaStore className='nav-icon' size={24} />
            <span>Loja</span>
          </button>
        </nav>
        <a
          href="https://discord.com/invite/xnSVVaa5VJ"
          target="_blank"
          rel="noopener noreferrer"
          className="discord-button"
        >
          <FaDiscord className="icon" />
          <span>Entrar no Discord</span>
        </a>
      </header>
      <img src={LogoSticker} alt='Logo Jardim Blox Sticker' className='logo-home' />
      </>
  );
};

export default Header;
