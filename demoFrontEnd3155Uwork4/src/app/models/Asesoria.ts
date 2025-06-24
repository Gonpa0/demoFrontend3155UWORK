import { Usuario } from '../models/Usuario';

export class Asesoria {
  id: number = 0;
  nombreAsesoria: string = '';
  usuarioInferior: Usuario = new Usuario();  // Para mostrar datos del asesorado
  usuarioSuperior: Usuario = new Usuario();  // Para mostrar datos del asesor
  FechaAsesoria: string = '';
}