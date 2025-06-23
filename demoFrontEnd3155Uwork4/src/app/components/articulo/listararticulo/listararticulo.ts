import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Articulo } from '../../../models/Articulo';
import { ArticuloService } from '../../../services/articulo.service';

@Component({
  selector: 'app-listararticulo',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    //RouterLink
  ],
  templateUrl: './listararticulo.html',
  styleUrl: './listararticulo.css'
})
export class Listararticulo {
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];
  dataSource:MatTableDataSource<Articulo>=new MatTableDataSource()

  constructor(private articuloS:ArticuloService){
  }

  ngOnInit(): void {
    this.articuloS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
    /* this.articuloS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      }) */
  }
}
