import React, { useState } from 'react';
import { FaDiscord, FaUsers, FaComments, FaHandsHelping, FaShoppingCart, FaTiktok, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

import LogoReduzida from '../../assets/logos/logo_reduzida.svg';

import FAQ from '../../components/faq/Faq';
// import Footer from '../../components/footer/Footer'

import './community.css';
import FooterComponent from '../../components/footer/Footer';

const Community = () => {
    const navigate = useNavigate();
    const [online, setOnline] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000, // duração da animação em ms
            once: true,     // anima uma única vez ao entrar na viewport
        });
    }, []);

    useEffect(() => {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();
        const minutosDesdeMeiaNoite = horas * 60 + minutos;

        // Das 10:00 (600) até 23:59 (1439)
        if (minutosDesdeMeiaNoite >= 600 && minutosDesdeMeiaNoite <= 1439) {
        setOnline(true);
        } else {
        setOnline(false);
        }
    }, []);

    return (
        <section className='community-section'>

            <div className="community-container">
<div className={`online-div ${online ? 'online-true' : 'online-false'}`}>
    <div
        className='cta-button'
        onClick={() => navigate('/', { state: { initialTab: 'store' } })}
    >
        <FaShoppingCart className='cart-btn' />
        <p>Veja nossos produtos</p>
    </div>
    <div className='online'>
        <p>{online ? 'Estamos Online!' : 'Voltamos logo...'}</p>
    </div>
</div>
                <div className='box'>

                <section className="hero-section">
                    <h1 data-aos="fade-right">Bem-vindo à nossa comunidade!</h1>
                    <div className='hero-div'>
                        <p data-aos="fade-right">
                            Entre no nosso servidor do <span>DISCORD</span> e fique por dentro das novidades, eventos e da comunidade! Aqui é o espaço perfeito para se conectar, aprender, compartilhar e crescer junto com outros membros!
                        </p>
                        <div className="social-buttons-comm" data-aos="zoom-in">
                            <a
                                href="https://discord.com/invite/xnSVVaa5VJ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="discord-button-comm"
                            >
                                <FaDiscord className="icon" />
                            </a>
                            <a
                                href="https://instagram.com/sua_pagina"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="discord-button-comm"
                            >
                                <FaInstagram className="icon" />
                            </a>
                            <a
                                href="https://tiktok.com/@sua_pagina"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="discord-button-comm"
                            >
                                <FaTiktok className="icon" />
                            </a>
                            </div>

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
            <FooterComponent />
        </section>
    );
};

export default Community;
