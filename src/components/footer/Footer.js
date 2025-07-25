import './footer.css';
import LogoSticker from '../../assets/logos/logo_sticker.svg';
import { FaDiscord, FaTiktok, FaInstagram } from 'react-icons/fa';

const FooterComponent = () => {
    return (
        <footer className='footer-container'>
            <div className="footer-left">
                <img className='footer-logo' src={LogoSticker} alt='Logo sticker no footer' />
            </div>

            <div className='footer-middle'>
                <h3 className="footer-title">Horário de Atendimento</h3>
                <p>Segunda a Sexta: 10h às 00h</p>
                <p>Finais de Semana e Feriados: 12h às 22h</p>
            </div>

            <div className='footer-right'>
                <h3 className="footer-title">Comunidade</h3>
                <div className="icons-footer">
                    <a href="https://discord.com/invite/xnSVVaa5VJ" target="_blank" rel="noopener noreferrer">
                        <FaDiscord className="icon-footer" />
                        <span>Discord</span>
                    </a>
                    <a href="https://instagram.com/jardimblox" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="icon-footer" />
                        <span>Instagram</span>
                    </a>
                    <a href="https://tiktok.com/@jardimblox1" target="_blank" rel="noopener noreferrer">
                        <FaTiktok className="icon-footer" />
                        <span>TikTok</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
