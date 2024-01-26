import { Injectable } from '@angular/core';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private apiUrl = environment.apiUrl + 'cuentas';

  constructor(private httpClient: HttpClient) {}

  estaLogueado() {
    return false;
  }

  obtenerRol(): string {
    return 'admin';
  }

  registrar(
    credenciales: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      `${this.apiUrl}/crear`,
      credenciales
    );
  }
}
