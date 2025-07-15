import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Header from '../../components/header/Header';

import './home.css';
import Community from "../Community/Community";
import Store from "../store/Store";


const Home = () => {
  const [activeTab, setActiveTab] = useState("community");

  const location = useLocation();

  useEffect(() => {
    if (location.state?.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location.state, setActiveTab]);

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
    <AnimatePresence mode="wait">
        <motion.div
          key={currentKey}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          style={{ width: "100%" }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
  )
}
  return (
      <div className="home-container">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  )
}

export default Home;
