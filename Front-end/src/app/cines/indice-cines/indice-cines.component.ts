import { Component, OnInit } from '@angular/core';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css'],
})
export class IndiceCinesComponent {
  constructor(private cinesService: CinesService) {}

  cines: cineDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar) {
    this.cinesService
      .obtenerTodos(pagina, cantidadRegistrosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<cineDTO[]>) => {
          this.cines = respuesta.body;
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

  borrar(id: number) {
    this.cinesService.borrar(id).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      (error) => console.error(error)
    );
  }
}
