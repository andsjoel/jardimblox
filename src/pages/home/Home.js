import { Link } from 'react-router-dom'

import Header from '../../components/header/Header';
import bgHome from '../../assets/images/background/background_home.png'
import FAQ from '../../components/faq/Faq';
import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <Header />

      <div className='home-hero'>
        <img src={bgHome} alt="Banner da loja" className="home-banner" />

        <Link to="/loja" className='btn-loja'>
          Veja nossos produtos!
        </Link>
      </div>

      <FAQ />
    </div>
  )
}

export default Home;
