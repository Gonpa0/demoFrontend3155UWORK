import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Rol } from '../../../models/Rol';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css',
})
export class Listarrol {
  displayedColumns: string[] = ['c1', 'c2'];
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource();
  constructor(private rS:RolService){}
  ngOnInit(): void {
   this.rS.list().subscribe(data =>{
    this.dataSource=new MatTableDataSource(data)
   })
  }
  
}
