import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker'; 
import { Asesoria } from '../../../models/Asesoria';
import { AsesoriaService } from '../../../services/asesoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asesoriaporfecha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatDatepickerModule
  ],
  templateUrl: './asesoriaporfecha.html',
  styleUrl: './asesoriaporfecha.css'
})
export class AsesoriaPorFechaComponent implements OnInit {
  displayedColumns: string[] = ['id', 'tema', 'fecha', 'asesor', 'estudiante'];
  dataSource: MatTableDataSource<Asesoria> = new MatTableDataSource();
  form: FormGroup;
  noResults: boolean = false;

  constructor(
    private fb: FormBuilder,
    private asesoriaService: AsesoriaService
  ) {
    this.form = fb.group({
      fecha: ['']
    });
  }

  ngOnInit(): void {
    // Carga inicial (opcional: lista completa)
    this.asesoriaService.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.noResults = data.length === 0;
    });

    // Escuchar cambios de fecha
    this.form.get('fecha')?.valueChanges.subscribe(value => {
      this.buscarPorFecha(value);
    });
  }

  buscarPorFecha(fecha: Date): void {
    if (fecha) {
      const fechaISO = fecha.toISOString().split('T')[0]; // yyyy-MM-dd
      this.asesoriaService.searchByFecha(fechaISO).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = data.length === 0;
      });
    } else {
      // Si se borra la fecha, se vuelve a cargar todo
      this.asesoriaService.list().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.noResults = false;
      });
    }
  }
}
