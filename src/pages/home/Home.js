// import { Link } from 'react-router-dom'
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Header from '../../components/header/Header';
// import bgHome from '../../assets/images/background/background_home.png'
import FAQ from '../../components/faq/Faq';
import LogoPrincipal from '../../assets/logos/logo_sticker.svg';



import './home.css';
import Community from "../Community/Community";
import Store from "../store/Store";

const Home = () => {
  const [activeTab, setActiveTab] = useState("community");

  const renderContent = () => {
    const variants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
  };

    const currentKey = activeTab; // isso é importante pro AnimatePresence

    let Component;
    if (activeTab === "community") Component = Community;
    else if (activeTab === "store") Component = Store;


  return (
    // <>
    //   <div className='home-container'>
        
    //     <div className='home-hero'>
    //       <img src={LogoPrincipal} alt="Logo da Loja Jardim Blox" className="home-logo" />
    
    //       {/* <Link to="/loja" className='btn-loja'>
    //         Veja nossos produtos!
    //       </Link> */}
    //     </div>

    //     <FAQ />
    //   </div>
    // </>
    <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          style={{ position: "absolute", width: "100%" }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
  )
}
  return (
      <div className="home-container" style={{ position: "relative", paddingBottom: "60px", minHeight: "100vh", overflowX: "hidden" }}>
      {renderContent()}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

export default Home;
