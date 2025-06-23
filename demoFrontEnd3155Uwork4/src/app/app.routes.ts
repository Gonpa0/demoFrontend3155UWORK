import { Routes } from '@angular/router';
import { Formatoarchivo } from './components/formatoarchivo/formatoarchivo';
import { Insertareditar } from './components/formatoarchivo/insertareditar/insertareditar';
import { Rol } from './components/rol/rol';
import { Insertareditarrol } from './components/rol/insertareditarrol/insertareditarrol';
import { Premio } from './components/premio/premio';
import { Insertareditarpremio } from './components/premio/insertareditarpremio/insertareditarpremio';
import { Articulo } from './components/articulo/articulo';




export const routes: Routes = [
    {
      path:'',redirectTo:'formatoarchivos',pathMatch:'full' //LA RUTA POR DEFECTO AL PONER http://localhost:4200/
    },
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
      path:'articulos', component:Articulo,
    }
];
