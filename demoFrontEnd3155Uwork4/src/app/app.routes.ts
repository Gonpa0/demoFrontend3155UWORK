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
import { Usuariopremio } from './components/usuariopremio/usuariopremio';
import { Insertareditarusuariopremio } from './components/usuariopremio/insertareditarusuariopremio/insertareditarusuariopremio';
import { ArticuloComponent } from './components/articulo/articulo';
import { Insertareditararticulo } from './components/articulo/insertareditararticulo/insertareditararticulo';
import { Comentarioarticulo } from './components/comentarioarticulo/comentarioarticulo';
import { Insertareditarcomentarioarticulo } from './components/comentarioarticulo/insertareditarcomentarioarticulo/insertareditarcomentarioarticulo';
import { Asesoria } from './components/asesoria/asesoria';
import { Insertareditarasesoria } from './components/asesoria/insertareditarasesoria/insertareditarasesoria';
import { Insertareditarvaloracion } from './components/valoracion/insertareditarvaloracion/insertareditarvaloracion';
import { Insertareditarmensaje } from './components/mensaje/insertareditarmensaje/insertareditarmensaje';
import { Valoracion } from './components/valoracion/valoracion';
import { Mensaje } from './components/mensaje/mensaje';
import { Notificacion } from './components/notificacion/notificacion';
import { Insertareditarnotificacion } from './components/notificacion/insertareditarnotificacion/insertareditarnotificacion';
import { Buscar } from './components/articulo/buscar/buscar';
import { Reportes } from './components/reportes/reportes';







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
    },
    {
        path:'usuariopremios',component:Usuariopremio,
        children:[
            {
                path:'nuevo',component:Insertareditarusuariopremio
            },
            {
                path:'ediciones/:id',component:Insertareditarusuariopremio
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
          },
          {
            path:'busquedas', component:Buscar
          }
        ]
    },
    {
      path:'comentarioarticulos', component:Comentarioarticulo,
      children:[
        {
          path:'nuevo', component:Insertareditarcomentarioarticulo
        },
        {
          path:'ediciones/:id', component:Insertareditarcomentarioarticulo
        }
      ]

    },
    {
        path:'asesorias', component:Asesoria,
        children:[
            {
                path:'nuevo',component:Insertareditarasesoria
            },
            {
                path:'ediciones/:id',component:Insertareditarasesoria
            }
        ]
    },
    {
        path:'valoraciones', component:Valoracion,
        children:[
            {
                path:'nuevo',component:Insertareditarvaloracion
            },
            {
                path:'ediciones/:id',component:Insertareditarvaloracion
            }
        ]
    },
    {
        path:'mensajes', component:Mensaje,
        children:[
            {
                path:'nuevo',component:Insertareditarmensaje
            },
            {
                path:'ediciones/:id',component:Insertareditarmensaje
            }
        ]
    },
    {
      path:'notificaciones', component:Notificacion,
      children:[
        {
           path:'nuevo',component:Insertareditarnotificacion
        },
        {
            path:'ediciones/:id',component:Insertareditarnotificacion
        }
      ]
    },
    {
      path:'reports', component:Reportes
    }

];
