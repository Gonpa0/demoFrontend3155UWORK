import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MensajeService } from '../../../services/mensaje.service';
import { BusquedaPalabraMensajesDTO } from '../../../models/BusquedaPalabraMensajesDTO';

@Component({
  selector: 'app-busquedapalabramensaje',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './busquedapalabramensaje.html',
  styleUrl: './busquedapalabramensaje.css'
})
export class BusquedaPalabraMensajeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'contenido', 'fecha', 'idUsuario', 'idAsesoria'];
  dataSource: MatTableDataSource<BusquedaPalabraMensajesDTO> = new MatTableDataSource();
  form: FormGroup;
  noResults: boolean = false;
  todosLosMensajes: BusquedaPalabraMensajesDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private mensajeService: MensajeService
  ) {
    this.form = fb.group({
      keyword: ['']
    });
  }

  ngOnInit(): void {
    this.mensajeService.buscarTodosParaFiltrar().subscribe(data => {
      this.todosLosMensajes = data;
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('keyword')?.valueChanges.subscribe(value => {
      this.filtrarMensajes(value);
    });
  }

  filtrarMensajes(keyword: string): void {
    if (keyword && keyword.trim() !== '') {
      const filtrados = this.todosLosMensajes.filter(m =>
        m.contenido.toLowerCase().includes(keyword.toLowerCase())
      );
      this.dataSource = new MatTableDataSource(filtrados);
      this.noResults = filtrados.length === 0;
    } else {
      this.dataSource = new MatTableDataSource(this.todosLosMensajes);
      this.noResults = false;
    }
  }
}
