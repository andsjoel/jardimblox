import React from 'react';
import { FaDiscord, FaUsers, FaComments, FaHandsHelping } from 'react-icons/fa';

import LogoReduzida from '../../assets/logos/logo_reduzida.svg';

import Header from '../../components/header/Header';
import './community.css';

const Community = () => {
    return (
        <section className='community-section'>
            <Header />
            <div className="community-container">
                <div className='box'>
                <section className="hero-section">
                    <h1>Bem-vindo à Nossa Comunidade!</h1>
                    <p>
                        Aqui é o espaço perfeito para se conectar, aprender, compartilhar e crescer junto com outros membros!
                    </p>
                </section>

                <section className="contact-links">
                    <div className='text-contact'>
                        <h2>Junte-se a Nós</h2>
                        <p>Entre no nosso servidor do DISCORD e fique por dentro das novidades, eventos e da comunidade!</p>
                    </div>
                    <div className="contact-buttons">
                        <a
                        href="https://discord.com/invite/xnSVVaa5VJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="discord-button-comm b"
                        >
                        <FaDiscord className="icon" />
                            <span>Venha fazer parte da nossa comunidade.</span>
                        </a>
                    </div>
                </section>

                <section className="community-features">
                    <div className="feature-card">
                        <img src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaUsers className="feature-icon" />
                        <h3>Conecte-se com Membros</h3>
                        <p>Participe de discussões, tire dúvidas e forme novas amizades com pessoas que compartilham dos mesmos interesses.</p>
                    </div>
                    <div className="feature-card">
                        <img src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaComments className="feature-icon" />
                        <h3>Fóruns e Canais</h3>
                        <p>Temos espaços organizados para diferentes tópicos, desde suporte técnico até conversas descontraídas.</p>
                    </div>
                    <div className="feature-card">
                        <img src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaHandsHelping className="feature-icon" />
                        <h3>Suporte Rápido</h3>
                        <p>Precisa de ajuda? Nossa equipe está disponível no Discord e WhatsApp para dar suporte sempre que necessário.</p>
                    </div>
                </section>

                </div>
            </div>
        </section>
    );
};

export default Community;
