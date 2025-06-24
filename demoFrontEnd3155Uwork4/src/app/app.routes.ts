import { Routes } from '@angular/router';
import { Formatoarchivo } from './components/formatoarchivo/formatoarchivo';
import { Insertareditar } from './components/formatoarchivo/insertareditar/insertareditar';
import { Rol } from './components/rol/rol';
import { Insertareditarrol } from './components/rol/insertareditarrol/insertareditarrol';
import { Premio } from './components/premio/premio';
import { Insertareditarpremio } from './components/premio/insertareditarpremio/insertareditarpremio';
import { Home } from './components/home/home';
import { Nosotros } from './components/nosotros/nosotros';
import { Usuario } from './components/usuario/usuario';
import { Insertareditarusuario } from './components/usuario/insertareditarusuario/insertareditarusuario';
import { Inicio } from './components/inicio/inicio';
import { Insertareditararticulo } from './components/articulo/insertareditararticulo/insertareditararticulo';
import { ArticuloComponent } from './components/articulo/articulo';







export const routes: Routes = [
    {
      path:'',redirectTo:'home',pathMatch:'full' //LA RUTA POR DEFECTO AL PONER http://localhost:4200/
    },
    {
        path:'inicio',component:Inicio
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
        path:'articulos', component:ArticuloComponent,
        children:[
          {
            path:'nuevo', component:Insertareditararticulo
          },
          {
                path:'ediciones/:id',component:Insertareditararticulo //CUANDO FUNCIONE EL MODIFICAR
          }
        ]
    }, //eliminar antes de hacer el commit para que no de error
    {
        path:'home', component:Home,
        },
    {
        path:'nosotros', component:Nosotros,
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
