import React from 'react';
import { FaDiscord, FaWhatsapp, FaUsers, FaComments, FaHandsHelping } from 'react-icons/fa';
import Header from '../../components/header/Header';
import './community.css';

const Community = () => {
    return (
        <>
            <Header />
            <div className="community-container">
                <section className="hero-section">
                    <h1>Bem-vindo à Nossa Comunidade!</h1>
                    <p>
                        Aqui é o espaço perfeito para se conectar, aprender, compartilhar experiências e crescer junto com outros membros!
                    </p>
                </section>

                <section className="community-features">
                    <div className="feature-card">
                        <FaUsers className="feature-icon" />
                        <h3>Conecte-se com Membros</h3>
                        <p>Participe de discussões, tire dúvidas e forme novas amizades com pessoas que compartilham dos mesmos interesses.</p>
                    </div>
                    <div className="feature-card">
                        <FaComments className="feature-icon" />
                        <h3>Fóruns e Canais</h3>
                        <p>Temos espaços organizados para diferentes tópicos, desde suporte técnico até conversas descontraídas.</p>
                    </div>
                    <div className="feature-card">
                        <FaHandsHelping className="feature-icon" />
                        <h3>Suporte Rápido</h3>
                        <p>Precisa de ajuda? Nossa equipe está disponível no Discord e WhatsApp para dar suporte sempre que necessário.</p>
                    </div>
                </section>

                <section className="contact-links">
                    <h2>Junte-se a Nós</h2>
                    <p>Escolha seu canal favorito e entre agora mesmo:</p>
                    <div className="contact-buttons">
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="contact-link discord">
                            <FaDiscord className="contact-icon" />
                            <span>Entrar no Discord</span>
                        </a>
                        <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp">
                            <FaWhatsapp className="contact-icon" />
                            <span>Entrar no WhatsApp</span>
                        </a>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Community;
