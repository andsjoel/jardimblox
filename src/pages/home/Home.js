import Header from '../../components/header/Header';
import bgHome from '../../assets/images/background/background_home.avif'
import './home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <Header />
      <img src={bgHome} alt="Banner da loja" className="home-banner" />
      <h1>Home</h1>
    </div>
  )
}

export default Home;
