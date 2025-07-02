import { Component } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';
import { Gemini } from '../../models/Gemini';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
  configuracion: string = ',Responde en español y maximo en un solo párrafo.'
  promptfinal: string = ''
  prompt: string = '';
  respuesta: string = '';
  selectedFile: File | null = null;

  constructor(private geminiService: GeminiService)  {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  enviar() {
    if (this.selectedFile) {
      this.promptfinal =   `${this.prompt} y ${this.configuracion}`; 
      console.log(this.promptfinal);
      this.geminiService.enviarArchivo(this.selectedFile, this.promptfinal).subscribe({
        next: (res) => this.respuesta = res,
        error: (err) => {
          console.error('Error al enviar archivo:', err);
          this.respuesta = 'Error al procesar el archivo.';
        }
      });
    } else {
      this.promptfinal =   `${this.prompt} y ${this.configuracion}`; 
      console.log(this.promptfinal);
      const g = new Gemini();
      g.prompt = this.promptfinal;
      this.geminiService.enviarTexto(g).subscribe({
        next: (res) => this.respuesta = res,
        error: (err) => {
          console.error('Error al llamar al backend:', err);
          this.respuesta = 'Error al procesar la solicitud.';
        }
      });
    }
  }
}

