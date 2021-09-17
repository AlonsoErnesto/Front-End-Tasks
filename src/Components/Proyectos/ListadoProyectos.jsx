import React, { useContext, useEffect } from 'react'
import Proyecto from './Proyecto';

import proyectoContext from '../../Context/Proyects/proyectoContext';
import AlertaContext from '../../Context/Alertas/alertaContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ListadoProyectos = () => {

    //Extraer proyectos de state Inicial
    const proyectosContext = useContext(proyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;
    
    useEffect(() => {

        //  Si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos();
        //eslint-disable-next-line
    }, [mensaje])
    
    if (proyectos.length === 0) return <p>No hay proyectos, comienze a crear el primero.</p>;
    
    return (
        <ul className="listado-proyectos">
            { alerta ? (<div classNama={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null }
            <TransitionGroup>
                {proyectos.map(item => ( 
                    <CSSTransition
                        key={item._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto proyecto={item}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
     );
}
 
export default ListadoProyectos;