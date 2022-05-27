import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

//Components
import Login from './Login/index';
import Container from './Container/index';
import { createBrowserHistory } from "history";



const history = createBrowserHistory();
//import ProcesoSPI from './Pages/ProcesoSPI/index';

//import Pagina404 from "./Pagina404/Pagina404";

const Router = () => (
    <BrowserRouter history={history}>
        <Switch>
            <Route exact path="/" component={Login} />
            {/*<Route exact path="/container" component={Container} />*/}
            <Container>
                <Route component={({ match }) =>
                    <div>
                        <Route path="/" />
                        {/*<Route path="/Compras" component={Compras} />
            <Route path="/Usuario" component={Usuario} />
            <Route path="/Moneda">
              <Moneda />
            </Route>
            <Route path="/Proveedor">
              <Proveedor />
            </Route>
            <Route path="/CuentasContables">
              <CuentaContables />
            </Route>
            <Route path="/Iva">
              <Iva />
            </Route>
            <Route path="/Rol">
              <Rol />
            </Route>
            <Route path="/RolMenu">
              <RolMenu />
            </Route>
            <Route path="/MenuConfiguracion">
              <MenuConfiguracion />
            </Route>
            <Route path="/TipoProveedor">
              <TipoProveedor />
            </Route>
            <Route path="/TipoPago">
              <TipoPago />
            </Route>
            <Route path="/ReporteCompras">
              <ReporteCompras />
            </Route>
            <Route path="/Menu">
              <MenuAplicacion />
</Route>*/}
                    </div>
                } />
            </Container>

        </Switch>
    </BrowserRouter>
);

export default Router;