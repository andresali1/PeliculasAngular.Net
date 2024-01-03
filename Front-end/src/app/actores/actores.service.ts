import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { actorCreacionDTO } from './actor';
import { HttpClient } from '@angular/common/http';
import { formatearFecha } from '../utilidades/utilidades';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  private apiUrl = environment.apiUrl + 'actores';

  constructor(private http: HttpClient) {}

  public crear(actor: actorCreacionDTO) {
    const formData = this.construirFormData(actor);

    return this.http.post(this.apiUrl, formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
      formData.append('biografia', actor.biografia);
    }
    if (actor.fechaNacimiento) {
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;
  }
}
