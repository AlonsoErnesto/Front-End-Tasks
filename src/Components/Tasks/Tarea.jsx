import React, {useContext} from 'react';
import tareaContext from '../../Context/Tareas/tareaContext';
import proyectoContext from '../../Context/Proyects/proyectoContext';


const Tarea = ({ tareas }) => {

    //Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //context de tarea
    const tareasContext = useContext(tareaContext)
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    //Extraer proyecto
    const [proyectoActual] = proyecto;


    //Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
        console.log('err')
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual.id);
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if (tarea.estado)
        {
            tarea.estado = false
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea)
    }

    //agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }



    return (
        <li className="tarea sombra">
            <p>{tareas.nombre}</p>
            <div className="estado">
                {tareas.estado
                    ? (<button
                        className="completo"
                        type="button"
                        onClick={()=>cambiarEstado(tareas)}
                    >
                        Completo
                    </button>)
                    : (<button
                        className="incompleto"
                        type="button"
                        onClick={()=>cambiarEstado(tareas)}
                    >
                        Incompleto
                    </button>)
                }
            </div>
            <div className="acciones">
                <button
                    className="btn btn-primario"
                    type="button"
                    onClick={( )=>seleccionarTarea(tareas)}
                >
                    Editar
                </button>
                <button
                    className="btn btn-secundario"
                    type="button"
                    onClick = { () => tareaEliminar(tareas._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;