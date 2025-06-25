import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Notificacion } from '../models/Notificacion';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private url = `${base_url}/notificacion`
  private listaCambio=new Subject<Notificacion[]>


  constructor(private h:HttpClient) { }

  list(){
      return this.h.get<Notificacion[]>(this.url)
    }

  insert(notificacion:Notificacion){
      return this.h.post(this.url,notificacion)
    }

  getList(){
        return this.listaCambio.asObservable()
      }

  setList(listaNueva:Notificacion[]){
        this.listaCambio.next(listaNueva)
      }

   listId(id:number){
      return this.h.get<Notificacion>(`${this.url}/${id}`)
    }

    update(notificacion:Notificacion){
      return this.h.put(this.url,notificacion)
    }

     deleteNotificacion(id:number){
    return this.h.delete(`${this.url}/${id}`)
  }

}
