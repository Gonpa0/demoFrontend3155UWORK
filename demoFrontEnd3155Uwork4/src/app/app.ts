import { Component } from '@angular/core';
import { Formatoarchivo } from "./components/formatoarchivo/formatoarchivo";
import { Rol } from './components/rol/rol';

@Component({
  selector: 'app-root',
  imports: [Formatoarchivo,Rol],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'demoFrontEnd3155Uwork4';
}
