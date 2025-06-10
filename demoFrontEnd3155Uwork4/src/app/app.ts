import { Component } from '@angular/core';
import { Formatoarchivo } from "./components/formatoarchivo/formatoarchivo";

@Component({
  selector: 'app-root',
  imports: [Formatoarchivo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'demoFrontEnd3155Uwork4';
}
