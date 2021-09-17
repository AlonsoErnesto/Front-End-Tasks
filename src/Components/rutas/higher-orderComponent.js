import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/autenticacion/authContext';

// Comoponente dentro de otro componente =  {component: Component}


const RutaPrivada = ({ component:Component, ...props }) => {
   
      
   const authContext = useContext(AuthContext);
   const { autenticado, usuarioAutenticado, cargando } = authContext;

   useEffect(()=>{
      usuarioAutenticado();
      // Evitar ciclo 
      // eslint-disable-next-line
   },[])

   return (
      
      <Route {...props} 
      render = { props => !autenticado  && !cargando
         ? ( <Redirect to ="/" />) 
         : ( <Component {...props}/>) 
      }/>

   );
}


export default RutaPrivada;



