import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private url = `${base_url}/articulos`
  private listaCambio=new Subject<Articulo[]>


  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Articulo[]>(this.url)
    }

}
