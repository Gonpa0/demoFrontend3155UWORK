import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AsesoriaService } from '../../../services/asesoria';
import { Asesoria } from '../../../models/Asesoria';


@Component({
  selector: 'app-listarasesoria',
  imports: [MatTableModule, MatButtonModule, RouterLink,MatIconModule, MatPaginatorModule],
  templateUrl: './listarasesoria.html',
  styleUrl: './listarasesoria.css'
})
export class Listarasesoria implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7'];

  dataSource: MatTableDataSource<Asesoria> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private aS:AsesoriaService){}
  
  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    this.aS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number){
    this.aS.deleteA(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.aS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.aS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}
