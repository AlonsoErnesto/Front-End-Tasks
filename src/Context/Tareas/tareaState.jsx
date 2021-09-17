import React, { useReducer } from 'react'
import tareaContext from './tareaContext'
import tareaReducer from './tareaReducer'

// import { v4 as uuid } from 'uuid';


import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
  
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../Types/Index'

import clienteAxios from '../../config/axios';

const TareaState = props => {
    const initialState = {
        
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada:null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //Crear las funciones 



    //Obtener las tareas
    const obtenerTareas = async proyecto => {
       try {
           const resultado = await clienteAxios.get('/api/tareas', { params : {proyecto}});
        dispatch({
            type: TAREAS_PROYECTO,
            payload: resultado.data.tareas
        })
       } catch (error) {
           console.log(error)
       }
    }

       //Modificar estado tarea
    //    const modificarEstado = tarea => {
    //     dispatch({
    //         type: ESTADO_TAREA,
    //         payload:tarea
    //     })
    // }



    //agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        // tarea.id = uuid();
        console.log(tarea)
        
        try {
            const resultado = await clienteAxios.post('/api/tareas',tarea);
        dispatch({
            type: AGREGAR_TAREA,
            payload:tarea,
        })
        } catch (error) {
            console.log(error)
        }
    }
    //validacion 
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA,
            
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {
       
        try {
            await clienteAxios.delete(`/api/tareas/${id}`,{params:{proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload:id
            })
        } catch (error) {
            console.log(error)
        }

    }

 

    //Extrae una tarea para la Edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload:tarea
        })
    }

    //Edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }


    //Eliminar la tarea seleccionada
    const limpiarTarea = async tarea => {
      
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`,tarea)
            dispatch({
                type: LIMPIAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <tareaContext.Provider
            value={{
               
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada:state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

           }}
        >
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;


