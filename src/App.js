import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Store from './pages/store/Store';
import './App.css';
import Admin from './pages/admin/Admin';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import Painel from './pages/painel/Painel';
import Contact from './pages/contact/Contact';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/loja' element={ <Store /> } />
        <Route path='/contato' element={ <Contact /> } />
        <Route path='/produto/:id' element={ <ProductDetail /> } />

        <Route path='/admin' element={ <Admin /> } />
        <Route
          path="/admin/painel"
          element={
            <PrivateRoute>
              <Painel />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
