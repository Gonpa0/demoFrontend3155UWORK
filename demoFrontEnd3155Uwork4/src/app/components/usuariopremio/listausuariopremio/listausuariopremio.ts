import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsuarioPremio } from '../../../models/UsuarioPremio';
import { UsuariopremioService } from '../../../services/usuariopremio.service';
import { userInfo } from 'os';

@Component({
  selector: 'app-listausuariopremio',
  imports: [MatTableModule,MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listausuariopremio.html',
  styleUrl: './listausuariopremio.css'
})
export class Listausuariopremio implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5'];

  dataSource: MatTableDataSource<UsuarioPremio> = new MatTableDataSource();
  constructor(private upS:UsuariopremioService){}
  ngOnInit(): void {
      this.upS.list().subscribe(data=>{
        this.dataSource.data = data
      })
      this.upS.getList().subscribe(data=>{
        this.dataSource.data = data
      })
  }
  eliminar(id:number){
    this.upS.deleteUP(id).subscribe(data=>{
      console.log('Eliminado:', data);
      this.upS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.upS.setList(data);
      });
    })
  }
}
