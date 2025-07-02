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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ChatAsesoria implements OnInit, OnDestroy{

  idAsesoria: number = 0;
  mensajes: Mensaje[] = [];
  archivos: Archivo[] = [];
  contenidoNuevo: string = '';
  selectedFile: File | null = null;

  intervalId: any;
  @ViewChild('mensajesContainer') mensajesContainer!: ElementRef;



  constructor(
    private route: ActivatedRoute,
    private mensajeService: MensajeService,
    private archivoS:ArchivoService,
  ) {}

  ngOnInit(): void {
    // Obtener el id de la asesoría desde la ruta
    this.idAsesoria = +this.route.snapshot.paramMap.get('id')!;
    this.cargarMensajes();
    this.cargarArchivos();

     // <-- agregado: inicio de polling cada 2 segundos
    this.intervalId = setInterval(() => {
      this.cargarMensajes();
    }, 2000);

  }

   ngOnDestroy(): void {
    // <-- agregado: limpiar el intervalo cuando se destruye el componente
    clearInterval(this.intervalId);
  }

  cargarArchivos() {
  this.archivoS.listarPorAsesoria(this.idAsesoria).subscribe((data) => {
    this.archivos = data;
  });
}

  cargarMensajes() {
     const container = this.mensajesContainer?.nativeElement;

    // Detectar si el usuario ya estaba al fondo antes de recargar
    const estabaAbajo = container
      ? container.scrollTop + container.clientHeight >= container.scrollHeight - 50
      : true;

    this.mensajeService.listarMensajesPorAsesoria(this.idAsesoria).subscribe((data) => {
      this.mensajes = data;

      // <-- agregado: scroll automático hacia abajo después de cargar mensajes
       setTimeout(() => {
        if (estabaAbajo) {
          this.scrollToBottom();
        }
      }, 100);
    });
  }

 scrollToBottom() {
    try {
      this.mensajesContainer.nativeElement.scrollTop = this.mensajesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  enviarMensaje() {

    if (this.contenidoNuevo.trim().length === 0) {
      return;
    }

    const nuevoMensaje = new Mensaje();

    nuevoMensaje.contenido = this.contenidoNuevo;
    nuevoMensaje.fechaMensaje = new Date();
    nuevoMensaje.orden = this.mensajes.length + 1;

    // simulamos el usuario logueado - PORQUE TODAVIA NO TENEMOS EL LOGIN O EL AUTH
    // simulando el estudiante que sube el archivo 1 = Jaime(Superior) // | 2 = Pedro (Inferior)
    const idUsuario = 2;

    nuevoMensaje.usuario = new Usuario();
    nuevoMensaje.usuario.idUsuario = idUsuario; // se asigna el usuario simulado porque no tenemos el auth o login aun

    nuevoMensaje.asesoria = new Asesoria();
    nuevoMensaje.asesoria.idAsesoria = this.idAsesoria; // se asigna el id de asesoria que detecto al momento de entrar al componente chat asesoria

    this.mensajeService.insert(nuevoMensaje).subscribe(() => {
        this.contenidoNuevo = ''; // limpia sin romper el input donde el estudiante escribio
        this.cargarMensajes(); // carga de nuevo la lista de mensajes por id de asesoria
    });
  }


  //PARA SUBIR ARCHIVO

  onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

  subirArchivo() {
  if (!this.selectedFile) {
    return;
  }

  const formData = new FormData();
  formData.append('archivo', this.selectedFile);
  formData.append('idUsuario', '2'); // simulando el estudiante que sube el archivo 1 = Jaime(Superior) // | 2 = Pedro (Inferior)
                                      // simulando el id de usuario o estudiante porque no tenemos el login o auth aun
  formData.append('idAsesoria', this.idAsesoria.toString());
  formData.append('idFormato', '1'); // similando el formato archivo //pendiente que detecte automaticamente el formato al subir archivo
                                      // id 1 = pdf, 2= docx , 3=mp3, 4 = mp4 y 5 = pptx

  this.archivoS.subirArchivo(formData).subscribe(() => {
    alert('Archivo subido con éxito');
    this.selectedFile = null; // PARA LIMPIAR EL ARCHIVO O BORRARLO 
  });
}

}
