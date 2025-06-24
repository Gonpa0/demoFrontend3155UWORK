import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PremioServices } from '../../../services/premio.service';
import { Premio } from '../../../models/Premio';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-listarpremio',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginator,MatPaginatorModule],
  templateUrl: './listarpremio.html',
  styleUrl: './listarpremio.css',
})
export class Listarpremio implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: MatTableDataSource<Premio> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private pS: PremioServices) {}

  ngOnInit(): void {
    this.pS.list().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
    this.pS.getList().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.pS.deleteP(id).subscribe((data) => {
      console.log('Eliminado', data);
      this.pS.list().subscribe((data) => {
        console.log('Lista recargada:', data);
        this.pS.setList(data);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
