import { Component } from '@angular/core';
import { Formatoarchivo } from "./components/formatoarchivo/formatoarchivo";
import { Rol } from './components/rol/rol';
import { Premio } from './components/premio/premio';


@Component({
  selector: 'app-root',
  imports: [Formatoarchivo,Rol,Premio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'demoFrontEnd3155Uwork4';
}
