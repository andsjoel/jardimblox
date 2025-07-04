import React from 'react';
import { FaDiscord, FaWhatsapp } from 'react-icons/fa';
import './contact.css';
import Header from '../../components/header/Header';

const Contact = () => {
    return (
        <div className="contact-container">
          <Header />
          
            <h1>Entre em Contato</h1>
            <p>
                Se você tiver alguma dúvida ou precisar de ajuda, não hesite em entrar em contato conosco! 
                Estamos disponíveis pelo Discord ou WhatsApp para fornecer o suporte que você precisa.
            </p>
            
            <div className="contact-links">
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="contact-link discord">
                    <FaDiscord className="contact-icon" />
                    <span>Entrar no Discord</span>
                </a>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp">
                    <FaWhatsapp className="contact-icon" />
                    <span>Entrar no WhatsApp</span>
                </a>
            </div>
        </div>
    );
}

export default Contact;
