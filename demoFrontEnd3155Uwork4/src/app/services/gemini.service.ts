import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Gemini } from '../models/Gemini';
import { Observable } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private url = `${base_url}/chat`;
  constructor(private http: HttpClient) { }

  enviarTexto(gemini: Gemini): Observable<string> {
    return this.http.post(`${this.url}/text`, gemini, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }
  enviarArchivo(file: File, prompt: string): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', prompt);

  const extension = file.name.split('.').pop()?.toLowerCase();

  let tipo = 'file'; 

  if (extension) {
    if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) tipo = 'image';
    else if (['mp3', 'wav', 'ogg'].includes(extension)) tipo = 'audio';
    else if (['mp4', 'avi', 'mov'].includes(extension)) tipo = 'video';
  }

  return this.http.post(`${this.url}/${tipo}`, formData, {
    responseType: 'text'
  });
}
}
