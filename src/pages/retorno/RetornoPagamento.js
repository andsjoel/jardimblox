import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaQuestionCircle } from 'react-icons/fa';
import LogoContorno from '../../assets/logos/logo_sticker.svg';
import './retorno.css'
import Header from '../../components/header/Header';


export default function RetornoPagamento() {
  const { status } = useParams();

  const mensagens = {
    sucesso: {
      texto: 'Pagamento aprovado com sucesso!',
      icone: <FaCheckCircle />,
      message: 'Agora é só esperar que logo vamos entrar em contato com você!',
    },
    erro: {
      texto: 'Ocorreu um erro no pagamento.',
      icone: <FaTimesCircle />,
      message: 'Lamento, algo deu errado...',
    },
    pendente: {
      texto: 'Pagamento pendente, estamos aguardando a confirmação.',
      icone: <FaHourglassHalf />,
      message: 'Hmmm... As vezes o banco demora a processar o pagamento...',
    },
  };

  const fallback = {
    texto: 'Status desconhecido.',
    icone: <FaQuestionCircle />,
    message: 'Ué, o que houve aqui?',
  };

  const info = mensagens[status] || fallback;

  return (
    <>
    <Header />
    <section className='retorno-section'> 
        <img src={LogoContorno} alt='logo sticker da jardimblox' />
        <div className='retorno-container'>
            <div className='icon'>{info.icone}</div>
            <h3 className='retorno-message'>{info.texto}</h3>
            <p>{info.message}</p>
        </div>
    </section>
    </>
  );
}
