import { useEffect, useState } from 'react';
import { FaDiscord, FaStore, FaArrowLeft  } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

import './header.css';
import { useNavigate } from 'react-router-dom';
import ImageLogo from '../img-logo/ImageLogo';

const Header = ({ activeTab = '', setActiveTab = () => {}, showBackButton = false, dontShowLogo = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate(); // <- necessário para voltar de rota

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <nav className="nav">
          {showBackButton ? (
        <button
          className="nav-item back-button"
          onClick={() => {
            navigate('/', { state: { initialTab: 'store' } });
          }}
        >
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Voltar
        </button>
        
          ) : (
            <>
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
                aria-label="Loja"
              >
                <FaStore className='nav-icon' size={24} />
                <span>Loja</span>
              </button>
            </>
          )}
        </nav>
        {!showBackButton && (
          <a
            href="https://discord.com/invite/xnSVVaa5VJ"
            target="_blank"
            rel="noopener noreferrer"
            className="discord-button"
          >
            <FaDiscord className="icon" />
            <span>Entrar no Discord</span>
          </a>
        )}
      </header>
        {!dontShowLogo && <ImageLogo />}
    </>
  );
};


export default Header;
