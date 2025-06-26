import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Store from './pages/home/store/Store';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/loja' element={ <Store /> } />
      </Routes>
    </div>
  );
}

export default App;
