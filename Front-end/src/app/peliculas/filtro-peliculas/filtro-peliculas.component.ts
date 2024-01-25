import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculasService } from '../peliculas.service';
import { PeliculaDTO } from '../pelicula';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService
  ) {}

  form: FormGroup;

  generos: generoDTO[] = [];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  peliculas: PeliculaDTO[];

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe((generos) => {
      this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal);
      this.leerValoresUrl();
      this.buscarpeliculas(this.form.value);

      this.form.valueChanges.subscribe((valores) => {
        this.buscarpeliculas(valores);
        this.escribirParametrosBusquedaEnUrl();
      });
    });
  }

  private leerValoresUrl() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};

      if (params.titulo) {
        objeto.titulo = params.titulo;
      }

      if (params.generoId) {
        objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines) {
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnUrl() {
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if (valoresFormulario.generoId) {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }
    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(
        `proximosEstrenos=${valoresFormulario.proximosEstrenos}`
      );
    }
    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarpeliculas(valores: any) {
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
    this.peliculasService.filtrar(valores).subscribe((response) => {
      this.peliculas = response.body;
      this.escribirParametrosBusquedaEnUrl();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    });
  }

  paginatorUpdate(datos: PageEvent) {
    this.paginaActual = datos.pageIndex;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarpeliculas(this.form.value);
  }

  limpiar() {
    this.form.patchValue(this.formularioOriginal);
  }
}
