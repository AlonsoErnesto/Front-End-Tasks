import React,{ Fragment,useState, useContext } from 'react'

//useContext
import proyectoContext from '../../Context/Proyects/proyectoContext';


const Nuevoproyecto = () => {

    const proyectosContext = useContext(proyectoContext);
    
    const {
        formulario,
        mostrarFormulario,
        agregarProyecto,
        errorFormulario,
        mostrarError
    } = proyectosContext;

    const [proyect, setProyect] = useState({
        nombre:'',
    })

    const { nombre } = proyect;

    const onChangeProyecto = e => {
        setProyect({
            ...proyect,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProyecto = e => {
        e.preventDefault();
        //validar proyecto
        if (!nombre)
        {
            mostrarError();
            return;
        }
        //agregar state
        agregarProyecto(proyect)

        //Reiniciar el form
        setProyect({
            nombre: '',
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario()
    }


    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>
            {
                formulario
                    ? <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre del Proyecto"
                        name="nombre"
    
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Agregar Proyecto"
                    />
                    </form>
                    : null
            }
            {errorFormulario ? <p className="mensaje error">Llene el campo</p> : null}
        </Fragment>
     );
}
 
export default Nuevoproyecto;

