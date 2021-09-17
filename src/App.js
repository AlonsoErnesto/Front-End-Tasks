import React from 'react'

//Components 
import Login from './Components/auth/Login';
import NuevaCuenta from './Components/auth/NuevaCuenta';
import Proyectos from './Components/Proyectos/Proyectos'


//react-rputer-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

//States and Reduce
import ProyectoState from './Context/Proyects/proyectoState';
//2 )
import TareaState from './Context/Tareas/tareaState';

import AlertaState from './Context/Alertas/alertaState';

import AuthState from './Context/autenticacion/authState';

import tokenAuth from './config/token';

import RutaPrivada from './Components/rutas/higher-orderComponent';


//  Revisar si tenemos un token
  const token = localStorage.getItem('token');
  if(token){
    tokenAuth(token);
  } 


function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)

  return (
    <ProyectoState>
      <TareaState>

        <AlertaState>
          <AuthState>
                <Router>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                    //  Ruta privada contiene un componente Proyectos dentro
                    <RutaPrivada exact path="/proyectos" component={Proyectos}/>
                  </Switch>
              </Router>
            </AuthState>
          </AlertaState>
        
        </TareaState>
    </ProyectoState>
  );  
}

export default App;

