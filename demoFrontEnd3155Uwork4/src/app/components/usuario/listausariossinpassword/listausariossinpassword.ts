import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { UsernameSinPasswordDTO } from '../../../models/UsernameSinPasswordDTO';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { UsernamesinpassworddtoService } from '../../../services/usernamesinpassworddto.service';

@Component({
  selector: 'app-listausariossinpassword',
  imports: [MatTableModule,MatButtonModule, MatIconModule,MatPaginatorModule],
  templateUrl: './listausariossinpassword.html',
  styleUrl: './listausariossinpassword.css'
})
export class Listausariossinpassword implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5', 'c6', 'c7', 'c8','c9'];

  dataSource: MatTableDataSource<UsernameSinPasswordDTO> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private udtoS:UsernamesinpassworddtoService){}
  
  ngOnInit(): void {
    this.udtoS.list().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
      
      
      this.udtoS.getList().subscribe(data=>{
        this.dataSource.data = data
        this.dataSource.paginator = this.paginator;
      })
  }
}
