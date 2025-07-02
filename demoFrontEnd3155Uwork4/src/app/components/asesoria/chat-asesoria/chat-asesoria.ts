import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Mensaje } from '../../../models/Mensaje';
import { MensajeService } from '../../../services/mensaje.service';
import { Usuario } from '../../../models/Usuario';
import { Asesoria } from '../../../models/Asesoria';
import { ArchivoService } from '../../../services/archivo.service';
import { MatIconModule } from '@angular/material/icon';
import { Archivo } from '../../../models/Archivo';

@Component({
  selector: 'app-chat-asesoria',
  imports: [ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './chat-asesoria.html',
  styleUrl: './chat-asesoria.css'
})
export class ChatAsesoria implements OnInit{

  // PARA ALMACENAR EL idAsesoria que se detecta automaticamente
  idAsesoria: number = 0;
  // PARA ALMACENAR EL nombreAsesoria que se detecta automaticamente
  nameAsesoria: string = '';
  // CREAR UN ARREGLO DE MENSAJES PARA EL CHAT
  mensajes: Mensaje[] = [];
  // CREAR UN ARREGLO DE ARCHIVOS PARA EL CHAT
  archivos: Archivo[] = [];
  // el contenido nuevo es lo que envia el usuario en la interfaz
  contenidoNuevo: string = '';
  // selectedFile guarda el archivo que el usuario a seleccionado
  selectedFile: File | null = null;






  constructor(
    private route: ActivatedRoute,
    private mensajeService: MensajeService,
    private archivoS:ArchivoService,
  ) {}

  ngOnInit(): void {
    // Obtener el id de la asesoría desde la ruta // el + es para convertir el valor a numero
    this.idAsesoria = +this.route.snapshot.paramMap.get('id')!;
    // Obtener el nombre de la asesoría desde la URL y decodificarlo en caso tenga
    // caracteres especiales como espacios, tildes o otro - hace la misma funcion que el de arriba (id)
    this.nameAsesoria = decodeURIComponent(this.route.snapshot.paramMap.get('nombreAsesoria')!);

    // SE CARGA TODOS LOS MENSAJES EXISTENTES EN BASE DE DATOS
      this.cargarMensajes();
    // SE CARGA TODOS LOS ARCHIVOS EXISTENTES EN BASE DE DATOS
      this.cargarArchivos();
  }



  // METODO PARA CARGAR ARCHIVOS POR ID DE ASESORIA
  cargarArchivos() {
  this.archivoS.listarPorAsesoria(this.idAsesoria).subscribe((data) => {
    this.archivos = data;
  });
}

//METODO PARA CARGAR MENSAJES POR ID DE ASESORIA
  cargarMensajes() {
    this.mensajeService.listarMensajesPorAsesoria(this.idAsesoria).subscribe((data) => {
      this.mensajes = data;
    });
  }

  //METODO PARA ENVIAR MENSAJE
  enviarMensaje() {

    //VALIDACION PARA QUE SE NO SE ENVIEN MENSAJES EN BLANCO - TRIM ES PARA QUITAR LOS ESPACIOS EN BLANCO
    if (this.contenidoNuevo.trim().length === 0) {
      return;
    }

    // se crea un nuevo mensaje y se asigna a nueva variable nuevoMensaje
    const nuevoMensaje = new Mensaje();

    // se asigna todos los atributos o campos que necesita el objeto Mensaje para registrarse
    nuevoMensaje.contenido = this.contenidoNuevo; // contenido nuevo viene del formulario lo que escribe el usuario
    nuevoMensaje.fechaMensaje = new Date(); // se genera una date actual y se asigna
    nuevoMensaje.orden = this.mensajes.length + 1; // arreglo de mensajes actual - se saca el tamaño y se suma
                                                   // + 1 para asignar al orden

    // simulamos el usuario logueado - PORQUE TODAVIA NO TENEMOS EL LOGIN O EL AUTH
    // simulando el estudiante que sube el archivo 1 = Jaime(Superior) // | 2 = Pedro (Inferior)
    const idUsuario = 2;

    nuevoMensaje.usuario = new Usuario();
    nuevoMensaje.usuario.idUsuario = idUsuario; // se asigna el usuario simulado porque no tenemos el auth o login aun

    nuevoMensaje.asesoria = new Asesoria();
    nuevoMensaje.asesoria.idAsesoria = this.idAsesoria; // se asigna el id de asesoria que detecto al momento de entrar al componente chat asesoria

    //metodo para insertar un mensaje - utiliza el service de mensaje
    this.mensajeService.insert(nuevoMensaje).subscribe(() => {
        this.contenidoNuevo = ''; // limpia sin romper el input donde el estudiante escribio
        this.cargarMensajes(); // carga de nuevo la lista de mensajes por id de asesoria
    });
  }


  //pARA SUBIR ARCHIVO
// ese método sirve para capturar y guardar el archivo que el usuario selecciona desde el <input type="file" />,
// asignándolo a this.selectedFile para luego poder subirlo.
  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}


  subirArchivo() {
    // si no se ha seleccionado ningún archivo (selectedFile es null), se detiene la función y no intenta subir nada.
  if (!this.selectedFile) {
    return;
  }
    // extrae la extensión del archivo ('pdf', 'docx', y otros) en minúsculas.
    const extension = this.selectedFile.name.split('.').pop()?.toLowerCase();

    //FORMATOS PERMITIDOS PARA LOS ARCHIVOS - ESTO TIENE QUE SER IGUAL A LA BASE DE DATOS DE FORMATO_ARCHIVO
    const formatosPermitidos: { [key: string]: number } = {
      pdf: 1,
      docx: 2,
      mp3: 3,
      mp4: 4,
      pptx: 5
    };

    // busca el ID del formato en base a la extensión extraída y lo asigna a LA Constante idFormato
    const idFormato = formatosPermitidos[extension || ''];

    // Si idformato es diferente a los formatospermidos va enviar una alerta de formato no permitido
    if (!idFormato) {
      alert('Formato de archivo no permitido');
      return;
    }
    // En caso contrario se crea el formdata para pasar todos los campos necesarios para enviar un objeto de tipo archivo
  const formData = new FormData();
  formData.append('archivo', this.selectedFile);
  formData.append('idUsuario', '2'); // simulando el estudiante que sube el archivo 1 = Jaime(Superior) // | 2 = Pedro (Inferior)
                                      // simulando el id de usuario o estudiante porque no tenemos el login o auth aun
  formData.append('idAsesoria', this.idAsesoria.toString());
  formData.append('idFormato', idFormato.toString()); // id 1 = pdf, 2= docx , 3=mp3, 4 = mp4 y 5 = pptx


  this.archivoS.subirArchivo(formData).subscribe(() => {
      alert('Archivo subido con éxito'); //alerta en la interfaz
      this.selectedFile = null; // la seleccion  del archivo se pone en null nuevamente
      this.cargarArchivos(); // actualiza lista en el chat de archivos
    },
  );
}

}
