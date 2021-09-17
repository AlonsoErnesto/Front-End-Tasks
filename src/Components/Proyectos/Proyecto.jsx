import React, { useContext } from 'react'

//context
import proyectoContext from '../../Context/Proyects/proyectoContext';
import tareaContext from '../../Context/Tareas/tareaContext';


const Proyecto = ({proyecto}) => {

    const proyectosContext = useContext(proyectoContext)

    const { proyectoActual } = proyectosContext;

    //Obtenner la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);//Fijar el proyecto actual
        obtenerTareas(id);

    }

    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={()=>seleccionarProyecto(proyecto._id)}>
                {proyecto.nombre}
            </button>
        </li>
     );
}
 
export default Proyecto;
