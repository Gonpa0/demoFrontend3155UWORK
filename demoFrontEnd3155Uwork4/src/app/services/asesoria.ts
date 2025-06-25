import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Asesoria } from '../models/Asesoria';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class AsesoriaService {
  private url = `${base_url}/asesoria`;
  private listaCambio = new Subject<Asesoria[]>();

  constructor(private http: HttpClient) {}

  // Listar todas las asesorías
  list() {
    return this.http.get<Asesoria[]>(this.url);
  }

  // Insertar nueva asesoría
  insert(a: Asesoria) {
    return this.http.post(this.url, a);
  }

  // Actualizar asesoría existente
  update(a: Asesoria) {
    return this.http.put(this.url, a);
  }

  // Eliminar asesoría por ID
  deleteA(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  // Buscar asesoría por ID
  listId(id: number) {
    return this.http.get<Asesoria>(`${this.url}/${id}`);
  }

  // Manejo de lista reactiva
  setList(listaNueva: Asesoria[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
}
