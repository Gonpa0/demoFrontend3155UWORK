import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Valoracion } from '../../../models/Valoracion';
import { ValoracionService } from '../../../services/valoracion.service';
@Component({
  selector: 'app-listarvaloracion',
  imports: [MatTableModule,MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule],
  templateUrl: './listarvaloracion.html',
  styleUrl: './listarvaloracion.css'
})
export class Listarvaloracion implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6'];
  dataSource: MatTableDataSource<Valoracion> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vS:ValoracionService){}
  ngOnInit(): void {
      this.vS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      
      this.vS.getList().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  }
  eliminar(id: number){
    this.vS.deleteV(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.vS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.vS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    })
  }
}
