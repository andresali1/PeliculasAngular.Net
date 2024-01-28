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
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  constructor(private httpClient: HttpClient) {}

  estaLogueado() {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);

    if (expiracionFecha <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  obtenerRol(): string {
    return '';
  }

  obtenerCampoJWT(campo: string): string {
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return '';
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo];
  }

  registrar(
    credenciales: credencialesUsuario
  ): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      `${this.apiUrl}/crear`,
      credenciales
    );
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion> {
    return this.httpClient.post<respuestaAutenticacion>(
      `${this.apiUrl}/login`,
      credenciales
    );
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }
}
