import React, { useContext,useState, useEffect } from 'react'

//Context
import proyectoContext from '../../Context/Proyects/proyectoContext';
import tareaContext from '../../Context/Tareas/tareaContext';



const Formtarea = () => {

    //Extraer si un proyecto esta true
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //Obtenner la funcion de contextTarea
    const tareasContext = useContext(tareaContext)
    const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if (tareaseleccionada !== null)
        {
            setTarea(tareaseleccionada);
        } else {
            setTarea({
                nombre:''
            })
        }
    },[tareaseleccionada])



    //State del formulario
    const [tarea, setTarea] = useState({
        nombre:''
    }) 


    if (!proyecto) return null;

    const [proyectoActual] = proyecto;

    //Leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]:e.target.value
        })
    }

    const { nombre } = tarea;

    const onSubmit = e => {
        e.preventDefault();
        console.log("tareaaaaaaaaaaa",tarea)
        //Validar
        if (nombre.trim() === '')
        {
            validarTarea();
            return;
        }

        //Si es edicion o si es nueva tarea
        if (tareaseleccionada === null) {
            tarea.proyecto = proyectoActual._id;
            tarea.estado = false;
            agregarTarea(tarea)
        } else {
            actualizarTarea(tarea);

            //Eiminar tareaSeleccionada del state
            limpiarTarea();
        }


        //Agregar la nueva tarea al state de tarea
        tarea.proyectoId = proyectoActual.id;
        tarea.estado = false;
        agregarTarea(tarea);
        
        //Obtener y filtrar ls tareas del proyecto ctual
        obtenerTareas(proyectoActual.id);

        //Reiniciar el formulario
        setTarea({
            nombre:''
        })

    }

    return (
        <div className="formulario">
            <form onSubmit = {onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea ..."
                        name="nombre"

                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada  ?   'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">Complete todos los campos</p> : null}
        </div>
     );
}
 
export default Formtarea;