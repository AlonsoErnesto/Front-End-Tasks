import React, {useEffect, useContext} from 'react'

import AuthContext from '../../Context/autenticacion/authContext';


const Barra = () => {

     //  Extraer la informacion de autenticacion
     const authContext = useContext(AuthContext);
     const { usuario, usuarioAutenticado, cerrarSesion } = authContext;
 
     useEffect(()=>{
         usuarioAutenticado();
         // eslint-disable-next-line
     },[]);




    return (
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span> {usuario.name} </span></p> : null}
          
            <nav className="nav-principal">
                <button 
                    className="btn btn-black cerrar-sesion"
                    onClick={()=>cerrarSesion()}
                >
                    Cerrar Sesion
                </button>
            </nav>
        </header>
     );
}
 
export default Barra;