import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormatoArchivo } from '../../../models/FormatoArchivo';
import { FormatoarchivoService } from '../../../services/formatoarchivo.service';

@Component({
  selector: 'app-listarformatoarchivo',
  imports: [MatTableModule],
  templateUrl: './listarformatoarchivo.html',
  styleUrl: './listarformatoarchivo.css'
})
export class Listarformatoarchivo {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource:MatTableDataSource<FormatoArchivo> = new MatTableDataSource()

  constructor(private faS:FormatoarchivoService){

  }

  ngOnInit(): void {
   this.faS.list().subscribe(data =>{
    this.dataSource=new MatTableDataSource(data)
   })
  }
}
