import React, { useReducer } from 'react'

//uuid
// import { v4 as uuid } from 'uuid';

//States
import proyectoContext from './proyectoContext'
import proyectoReducer from './proyectoReducer'

import {
    AGREGAR_PROYECTO,
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    PROYECTO_ERROR,
    ELIMINAR_PROYECTO
} from '../../Types/Index'

import clienteAxios from '../../config/axios';

const ProyectoState = props => {

    const initialState = {
        
        proyectos : [],
        formulario: false,
        errorFormulario: false,
        proyecto:null,
        mensaje:null,
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(proyectoReducer, initialState);
    
    const mostrarFormulario = (estado) => {
        dispatch({
            type:FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async () => {
       
        try {
            //  Mostrar proyectos desde la BD
            const resultado = await clienteAxios.get('/api/proyectos');
                dispatch({
                    type: OBTENER_PROYECTO,
                    payload: resultado.data.proyectos,
            })
        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
        }


  }

  //Agregar nuevo Proyecto 
    const agregarProyecto = async proyecto => {
        // proyecto.id = uuid();
        //Insertar el proyecto en el State
        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto);
            console.log(resultado);

            //  Insertar el proyecto en el state
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data,
            })

        } catch (error) {
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Valida el formualario por errores
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO,
            
        })
    }

    //Selecciona el Proyecto que el usuario dio Click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId,
        })
    }

    //Eliminar un proyecto
    const eliminarProyecto = async proyectoId => {
        
        try {

            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);

            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId,
            })
        } catch (error) {
            
            const alerta = {
                msg : 'Hubo un error',
                categoria : 'alerta-error'
            }

            dispatch({
                type:PROYECTO_ERROR,
                payload: alerta
            })
        }

    }

    //Funciones CRUD
    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )
}




export default ProyectoState;