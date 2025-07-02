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
import { Disponibilidad } from './components/disponibilidad/disponibilidad';
import { Insertareditardisponibilidad } from './components/disponibilidad/insertareditardisponibilidad/insertareditardisponibilidad';
import { Archivo } from './components/archivo/archivo';
import { Insertareditararchivo } from './components/archivo/insertareditararchivo/insertareditararchivo';
import { ChatAsesoria } from './components/asesoria/chat-asesoria/chat-asesoria';
import { Listausariossinpassword } from './components/usuario/listausariossinpassword/listausariossinpassword';
import { seguridadGuard } from './guard/seguridad.guard';
import { Login } from './components/login/login';
import { Chat } from './components/chat/chat';







export const routes: Routes = [
    {
      path:'',redirectTo:'home',pathMatch:'full' //LA RUTA POR DEFECTO AL PONER http://localhost:4200/
    },
    {
        path:'login', component:Login
    },
    /*{
      path:'',redirectTo:'home',pathMatch:'full' //LA RUTA POR DEFECTO AL PONER http://localhost:4200/
    },*/
    {
        path:'inicio',component:Inicio,
        canActivate: [seguridadGuard],
    },
    {
        path:'formatoarchivos',component:Formatoarchivo,
        children:[
            {
                path:'nuevo',component:Insertareditar
            },
            {
                path:'ediciones/:id',component:Insertareditar
            },
        ],
        canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
    },
    {
        path:'home', component:Home,
        // canActivate: [seguridadGuard],
    },
    {
        path:'nosotros', component:Nosotros,
        canActivate: [seguridadGuard],
    },
    {
        path:'usuarios',component:Usuario,
        children:[
            {
                path:'nuevo',component:Insertareditarusuario
            },
            {
                path:'ediciones/:id',component:Insertareditarusuario
            },
            {
              path:'listarsinpassword',component:Listausariossinpassword
            }
        ],
        canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
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
      ],
      canActivate: [seguridadGuard],

    },
    {
        path:'asesorias', component:Asesoria,
        children:[
            {
                path:'nuevo',component:Insertareditarasesoria
            },
            {
                path:'ediciones/:id',component:Insertareditarasesoria
            },
            {
                path:'chat/:id/:nombreAsesoria',component:ChatAsesoria
            }
        ],
      //  canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
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
        ],
        canActivate: [seguridadGuard],
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
      ],
      canActivate: [seguridadGuard],
    },
    {
      path:'reports', component:Reportes,canActivate: [seguridadGuard],
    },
      {
      path:'disponibilidades', component:Disponibilidad,
      children:[
        {
          path:'nuevo', component:Insertareditardisponibilidad
        },
        {
          path:'ediciones/:id', component:Insertareditardisponibilidad,
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path:'archivos', component:Archivo,
      children:[
        {
          path:'nuevo',component:Insertareditararchivo
        },
        {
          path:'ediciones/:id',component:Insertareditararchivo
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
        path: 'chatIA', component: Chat,
        canActivate: [seguridadGuard],
    }
];
