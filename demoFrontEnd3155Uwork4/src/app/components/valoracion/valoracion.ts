import { R } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarvaloracion } from './listarvaloracion/listarvaloracion';

@Component({
  selector: 'app-valoracion',
  imports: [RouterOutlet, Listarvaloracion],
  templateUrl: './valoracion.html',
  styleUrl: './valoracion.css'
})
export class Valoracion {
  
  constructor(public route: ActivatedRoute) {
    // Inicialización del componente
  }
}
