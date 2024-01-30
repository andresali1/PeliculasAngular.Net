import { Injectable } from '@angular/core';
import {
  UsuarioDTO,
  credencialesUsuario,
  respuestaAutenticacion,
} from './seguridad';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private apiUrl = environment.apiUrl + 'cuentas';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  constructor(private httpClient: HttpClient) {}

  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());

    return this.httpClient.get<UsuarioDTO[]>(`${this.apiUrl}/listadoUsuarios`, {
      observe: 'response',
      params,
    });
  }

  hacerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiUrl}/hacerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  removerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiUrl}/removerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

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
    return this.obtenerCampoJWT(this.campoRol);
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
