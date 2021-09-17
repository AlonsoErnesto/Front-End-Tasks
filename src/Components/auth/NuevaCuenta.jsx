import React,{useState, useContext, useEffect} from 'react';

import { Link } from 'react-router-dom'

import AlertaContext from '../../Context/Alertas/alertaContext';

import AuthContext from '../../Context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    // extraer los vlores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje,autenticado, registrarUsuario } = authContext;

    //  Si la cuenta esta ya registrada
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


    //  state para iniciar sesion
    const [user, setUser] = useState({
        name:'',
        email: '',
        password: '',
        repeatPassword: '',
    })

    const { email, password, repeatPassword, name } = user;


    const onChange = e => {
        
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })

    }

    //  Cuando el usuario inicie sesion
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no hay campos vcios
        if (name.trim() === '' || 
            email.trim() === '' ||
            password.trim() === '' ||
            repeatPassword.trim() === '' 
            ) {
            mostrarAlerta('Todos los campos son hobligatorios', 'alerta-error');
            return;
        }

        //Password minimo de 6 caracteres
        if (password.length < 6)
        {
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }
        

        //Si los dos pssword son iguales
        if (password !== repeatPassword) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }

        //  Pasarlo al action
        registrarUsuario({
            name,
            email,
            password,
        })

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{ alerta.msg   }</div>) : null }
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form onSubmit={onSubmit}>

                    {/* NAME */}
                    <div className="campo-form">
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nombre de Usuario"

                            value={name}
                            onChange={onChange}
                        />
                    </div>

                    {/* EMAIL */}
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Correo Electronico"

                            value={email}
                            onChange={onChange}
                        />
                    </div>

                      {/* PASSWORD */}
                      <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Contraseña"

                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    {/* PEPEAT - PASSWORD */}
                    <div className="campo-form">
                        <label htmlFor="repeatPassword">Repetir Contraseña</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            placeholder="Repetir Contraseña"

                            value={repeatPassword}
                            onChange={onChange}
                        />
                    </div>
                  
                    {/* BUTTON */}
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrar"
                        />
                    </div>
                </form>
                <Link to={'/'} className="enlace-cuenta">
                    Iniciar Sesion
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;