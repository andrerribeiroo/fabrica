import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import CadastroProduto from './pages/CadastroProduto';
import EditarProduto from './pages/EditarProduto';
import ResultadosPesquisa from "./pages/ResultadosPesquisa";
import 'bootstrap/dist/css/bootstrap.min.css';


import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>  
          <Route path="/home" element={<Home />}/>
          <Route path="/produtos" element={<ResultadosPesquisa />} />
          <Route path="/produto/cadastrar" element={<CadastroProduto />}/>
          <Route path="/produto/editar/:id" element={<EditarProduto />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
