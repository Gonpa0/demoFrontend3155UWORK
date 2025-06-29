import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Articulo } from '../../../models/Articulo';
import { ArticuloService } from '../../../services/articulo.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listararticulo',
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatPaginator
  ],
  templateUrl: './listararticulo.html',
  styleUrl: './listararticulo.css'
})
export class Listararticulo {
   displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<Articulo>=new MatTableDataSource()
    @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private articuloS:ArticuloService){
  }

  ngOnInit(): void {
      this.articuloS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      this.articuloS.getList().subscribe(data=>{
        // Actualizamos solo los datos para no romper el enlace con la tabla HTML.
        // Así la tabla se refresca automáticamente sin recrearla.
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  } /*this.dataSource= new MatTableDataSource(data) <= No funciona para actualizar automaticamente cuando hago new MatTableDataSource(data)*/

  eliminar(id:number){
    this.articuloS.deleteArticulo(id).subscribe(data=>{
      console.log('Eliminado:', data); /* Para ver si funciona el metodo delete en consola */
      this.articuloS.list().subscribe(data=>{
         console.log('Lista recargada:', data); /* Para ver si actualiza la lista al hacer el delete en consola */
        this.articuloS.setList(data)
        this.dataSource.paginator = this.paginator;
      })
    })
  }
}
