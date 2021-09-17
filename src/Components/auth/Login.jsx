import React, { useContext, useState, useEffect } from 'react';

//navigation
import { Link } from 'react-router-dom'

import AlertaContext from '../../Context/Alertas/alertaContext';
import AuthContext from '../../Context/autenticacion/authContext';


const Login = (props) => {

    


    //  Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

      //  Si el password este mal o el usuario no exista
      useEffect(() => {
        
        if (autenticado) {
            //navegame a esta pagina
            props.history.push('./proyectos')
        }

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])



    const [user, setUser] = useState({
        email: '',
        password:'',
    });
    
    const { email, password } = user;

    const onChange = (e) => {
        
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        //validatios 
        if (email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son hobligatorios', 'alerta-error');
        }
        
        //  Pasarlo al action
        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}> { alerta.msg}</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        {/* EMAIL */}
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo Electrónico"

                            value={email}
                            onChange={onChange}
                        />
                    </div>   
                        {/* PASSWORD */}
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"

                            value={password}
                            onChange={onChange}
                        />
                    </div>
                        {/* SUBMIT BUTTON */}
                        <div className="campo-form">
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Iniciar Sesión"
                            />
                        </div>
                </form>
                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Crear Cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;
