import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatoArchivo } from '../models/FormatoArchivo';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class FormatoarchivoService {
  private url = `${base_url}/formatoArchivo`

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<FormatoArchivo[]>(this.url)
  }
}
