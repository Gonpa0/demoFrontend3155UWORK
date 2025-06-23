import { Routes } from '@angular/router';
import { Formatoarchivo } from './components/formatoarchivo/formatoarchivo';
import { Insertareditar } from './components/formatoarchivo/insertareditar/insertareditar';
import { Rol } from './components/rol/rol';
import { Insertareditarrol } from './components/rol/insertareditarrol/insertareditarrol';
import { Premio } from './components/premio/premio';
import { Insertareditarpremio } from './components/premio/insertareditarpremio/insertareditarpremio';
import { Usuario } from './components/usuario/usuario';
import { Insertareditarusuario } from './components/usuario/insertareditarusuario/insertareditarusuario';





export const routes: Routes = [
    {
        path:'formatoarchivos',component:Formatoarchivo,
        children:[
            {
                path:'nuevo',component:Insertareditar
            },
            {
                path:'ediciones/:id',component:Insertareditar
            }
        ]
    },
    {
        path:'roles',component:Rol,
        children:[
            {
                path:'nuevo',component:Insertareditarrol
            },
            {
                path:'ediciones/:id',component:Insertareditarrol
            }
        ]
    },
    {
        path:'premios', component:Premio,
        children:[
            {
                path:'nuevo',component:Insertareditarpremio
            },
            {
                path:'ediciones/:id',component:Insertareditarpremio
            }
        ]
    },
    {
        path:'usuarios',component:Usuario,
        children:[
            {
                path:'nuevo',component:Insertareditarusuario
            },
            {
                path:'ediciones/:id',component:Insertareditarusuario
            }
        ]
    }
];
