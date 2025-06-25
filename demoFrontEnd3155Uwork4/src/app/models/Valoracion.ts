import { Asesoria } from '../models/Asesoria';
import { Usuario } from '../models/Usuario';

export class Valoracion {
  id: number = 0;
  calificacion: number = 0;
  asesoria: Asesoria = new Asesoria();
  usuario: Usuario = new Usuario();
}