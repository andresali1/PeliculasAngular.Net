import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UsuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css'],
})
export class IndiceUsuariosComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}

  usuarios: UsuarioDTO[];
  columnasAMostrar = ['email', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar) {
    this.seguridadService
      .obtenerUsuarios(pagina, cantidadRegistrosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<UsuarioDTO[]>) => {
          this.usuarios = respuesta.body;
          this.cantidadTotalRegistros = respuesta.headers.get(
            'cantidadTotalRegistros'
          );
        },
        (error) => console.error(error)
      );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  hacerAdmin(usuarioId: string) {
    this.seguridadService.hacerAdmin(usuarioId).subscribe(
      () => alert('Operación Realizada exitosamente'),
      (error) => console.error(error)
    );
  }

  removerAdmin(usuarioId: string) {
    this.seguridadService.removerAdmin(usuarioId).subscribe(
      () => alert('Operación Realizada exitosamente'),
      (error) => console.error(error)
    );
  }
}
