import './loading.css';
import Icon from '../../assets/logos/logo_reduzida.svg';

const Loading = () => {
    return (
        <div className='loading-container'>
            <div className='spinner-border'></div>
            <img className='logo-icon' src={Icon} alt='Logo pequena do Jardim Blox' />
        </div>
    );
};

export default Loading;
