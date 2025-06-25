import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Mensaje } from '../models/Mensaje';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  private url = `${base_url}/mensaje`;
  private listaCambio = new Subject<Mensaje[]>();
  constructor(private http: HttpClient) { }
  list() {
      return this.http.get<Mensaje[]>(this.url);
    }
    insert(m:Mensaje) {
      return this.http.post(this.url, m);
    }
    setList(listaNueva:Mensaje[]) {
      this.listaCambio.next(listaNueva);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    listId(id:number) {
      return this.http.get<Mensaje>(`${this.url}/${id}`);
    }
    update(m:Mensaje) {
      return this.http.put(this.url, m);
    }
    deleteM(id:number) {
      return this.http.delete(`${this.url}/${id}`);
    }
}
