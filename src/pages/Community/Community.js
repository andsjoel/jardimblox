import React from 'react';
import { FaDiscord, FaUsers, FaComments, FaHandsHelping, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import LogoReduzida from '../../assets/logos/logo_reduzida.svg';

import FAQ from '../../components/faq/Faq';

import './community.css';

const Community = () => {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 1000, // duração da animação em ms
            once: true,     // anima uma única vez ao entrar na viewport
        });
    }, []);

    return (
        <section className='community-section'>

            <div className="community-container">
                <div
                    className='cta-button'
                    onClick={() => navigate('/', { state: { initialTab: 'store' } })}
                    >
                    <FaShoppingCart className='cart-btn' />
                    <p>Veja nossos produtos!</p>
                </div>
                <div className='box'>

                <section className="hero-section">
                    <h1 data-aos="fade-right">Bem-vindo à nossa comunidade!</h1>
                    <div>
                        <p data-aos="fade-right">
                            Entre no nosso servidor do <span>DISCORD</span> e fique por dentro das novidades, eventos e da comunidade! Aqui é o espaço perfeito para se conectar, aprender, compartilhar e crescer junto com outros membros!
                        </p>
                        <a
                        href="https://discord.com/invite/xnSVVaa5VJ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="discord-button-comm b"
                        data-aos="zoom-in"
                        >
                            <FaDiscord className="icon" />
                                <span>Junte-se a Nós</span>
                        </a>
                    </div>
                </section>

                <section className="community-features" data-aos="fade-up">
                    <div className="feature-card">
                        <img className='orelhas-box' src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaUsers className="feature-icon" />
                        <h3>Conecte-se com Membros</h3>
                        <p>Participe de discussões, tire dúvidas e forme novas amizades.</p>
                    </div>
                    <div className="feature-card">
                        <img className='orelhas-box' src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaComments className="feature-icon" />
                        <h3>Fóruns e Canais</h3>
                        <p>Espaços organizados, desde suporte técnico até conversas descontraídas.</p>
                    </div>
                    <div className="feature-card">
                        <img className='orelhas-box' src={LogoReduzida} alt='logo reduzida da jardim blox' />
                        <FaHandsHelping className="feature-icon" />
                        <h3>Suporte Rápido</h3>
                        <p>Nossa equipe está disponível no Discord para dar suporte sempre que necessário.</p>
                    </div>
                </section>

                <FAQ />

                </div>
            </div>
        </section>
    );
};

export default Community;
