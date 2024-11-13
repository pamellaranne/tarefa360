import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Usuarios } from './pages/Usuarios/Usuarios';
import { NovoUsuario } from './pages/NovoUsuario/NovoUsuario';
import { EditarUsuario } from './pages/EditarUsuario/EditarUsuario';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/usuarios' element={<Usuarios/>} />
        <Route path='/usuario/novo' element={<NovoUsuario/>} />
        <Route path='/usuario/editar' element={<EditarUsuario/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
