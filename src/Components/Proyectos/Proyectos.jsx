import React, { useContext, useEffect } from 'react';
import Barra from '../Layouts/Barra';

//components
import Sidebar from '../Layouts/Sidebar';
import Formtarea from '../Tasks/FormTarea';
import ListadoTareas from '../Tasks/ListadoTareas';

import AuthContext from '../../Context/autenticacion/authContext';

const Proyectos = () => {

    //  Extraer la informacion de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(()=>{
        usuarioAutenticado();
        // eslint-disable-next-line
    },[])

    return (
        <div className="contenedor-app">
            <Sidebar/>

            <div className="seccion-principal">
                <Barra/>
                <main>
                    <Formtarea/>
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;