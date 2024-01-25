import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  LandingPageDTO,
  PeliculaCreacionDTO,
  PeliculaDTO,
  PeliculaPostGet,
  PeliculaPutGetDTO,
} from './pelicula';
import { formatearFecha } from '../utilidades/utilidades';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = environment.apiUrl + 'peliculas';

  constructor(private http: HttpClient) {}

  public obtenerLandingPage(): Observable<LandingPageDTO> {
    return this.http.get<LandingPageDTO>(this.apiUrl);
  }

  public obtenerPorId(id: number): Observable<PeliculaDTO> {
    return this.http.get<PeliculaDTO>(`${this.apiUrl}/${id}`);
  }

  public filtrar(valores: any): Observable<any> {
    const params = new HttpParams({ fromObject: valores });
    return this.http.get<PeliculaDTO[]>(`${this.apiUrl}/filtrar`, {
      params,
      observe: 'response',
    });
  }

  public postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(`${this.apiUrl}/postget`);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<number> {
    const formData = this.construirFormData(pelicula);

    return this.http.post<number>(this.apiUrl, formData);
  }

  public putGet(id: number): Observable<PeliculaPutGetDTO> {
    return this.http.get<PeliculaPutGetDTO>(`${this.apiUrl}/putget/${id}`);
  }

  public editar(id: number, pelicula: PeliculaCreacionDTO) {
    const formData = this.construirFormData(pelicula);

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData {
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));

    if (pelicula.fechaLanzamiento) {
      formData.append(
        'fechaLanzamiento',
        formatearFecha(pelicula.fechaLanzamiento)
      );
    }

    if (pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
