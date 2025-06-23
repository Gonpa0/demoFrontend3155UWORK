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


  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<Articulo[]>(this.url)
    }

  insert(articulo:Articulo){
      return this.h.post(this.url,articulo)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:Articulo[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<Articulo>(`${this.url}/${id}`)
    }

    update(articulo:Articulo){
      return this.h.put(this.url,articulo)
    }

     deleteArticulo(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }

}
