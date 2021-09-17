import React from 'react'
import ListadoProyectos from '../Proyectos/ListadoProyectos';
import Nuevoproyecto from '../Proyectos/NuevoProyecto';


const Sidebar = () => {
    return (
        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <Nuevoproyecto/>

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos/>
            </div>
        </aside>
     );
}
 
export default Sidebar;