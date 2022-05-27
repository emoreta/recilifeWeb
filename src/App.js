
import './App.css';
import Login from "./login/index"
import Container from "./container/index"
import Calificacion from './pages/calificacion/Calification';
import Day from './pages/dias/Day';
import State from './pages/estados/State';
import Schedule from './pages/horarios/Schedule';
import Recyclablematerial from './pages/materialReciclaje/Recyclablematerial';
import Perfil from './pages/perfil/Perfil';
import Sessions from './pages/sesiones/Sessions';
import Request from './pages/solicitud/Request';
import Templateemail from './pages/templateEmail/Templateemail';
import Usertype from './pages/tipoUsuario/Usertype';
import User from './pages/usuario/User';
import Locationuser from './pages/usuarioUbicacion/Locationuser';

import {
  BrowserRouter,
  Routes,
  Route,
  //Link,

} from "react-router-dom";


function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}>
          </Route>
          <Route path="container" element={<Container />}>
            <Route path="calificacion" element={<Calificacion />} />
            <Route path="dias" element={<Day />} />
            <Route path="usuario" element={<User />} />
            <Route path="materialReciclaje" element={<Recyclablematerial />} />
            <Route path="horarios" element={<Schedule />} />
            <Route path="templateEmail" element={<Templateemail />} />
            <Route path="estados" element={<State />} />
            <Route path="ubicacionUsuarios" element={<Locationuser />} />
            <Route path="solicitudes" element={<Request />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
