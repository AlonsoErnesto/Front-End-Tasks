import React, { Fragment, useContext } from 'react'
import Tarea from './Tarea';

//Context
import proyectoContext from '../../Context/Proyects/proyectoContext';
import tareaContext from '../../Context/Tareas/tareaContext';

import { CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasproyecto } = tareasContext;



    //Array destructuring para extraer el proyecto actual
    if(!proyecto) return <h2>Seleccione un proyecto</h2>
    const [ proyectoActual ] = proyecto;


    //Eliminar Proyecto
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: { proyectoActual.nombre }</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ? (<li className="tarea"><p>No hay Tareas</p></li>)
                    : <TransitionGroup>
                        {tareasproyecto.map(item => (
                            <CSSTransition
                                key={item.id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea  tareas={item} />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                className="btn btn-eliminar"
                type="button"
                onClick={()=>onClickEliminar()}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;