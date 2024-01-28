import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RatingService {
  apiUrl = environment.apiUrl + 'rating';

  constructor(private httpClient: HttpClient) {}

  rate(peliculaId: number, puntuacion: number) {
    return this.httpClient.post(this.apiUrl, { peliculaId, puntuacion });
  }
}
