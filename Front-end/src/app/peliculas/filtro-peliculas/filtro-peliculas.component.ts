import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  form: FormGroup;

  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Comedia' },
    { id: 3, nombre: 'Acción' },
  ];

  peliculas = [
    {
      titulo: 'Spider Man 1',
      enCines: false,
      proximosEstrenos: true,
      generos: [2, 3],
      poster:
        'https://resizing.flixster.com/b9rNJVStNlFHkXlX0qtblow_SIE=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p13222290_b_v8_ad.jpg',
    },
    {
      titulo: 'Inception',
      enCines: true,
      proximosEstrenos: false,
      generos: [1],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
    },
    {
      titulo: 'Grown Ups 2',
      enCines: false,
      proximosEstrenos: true,
      generos: [2],
      poster:
        'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/f4d59b48a1c106958485d311a31af0c1aa81808b5903ccb79fab5af5050ed6cf._RI_TTW_.jpg',
    },
    {
      titulo: '007 Skyfall',
      enCines: true,
      proximosEstrenos: false,
      generos: [1, 3],
      poster:
        'https://es.web.img3.acsta.net/pictures/15/11/13/08/29/159059.jpg',
    },
    {
      titulo: 'Rapidos y furiosos 5',
      enCines: false,
      proximosEstrenos: true,
      generos: [2, 3],
      poster:
        'https://es.web.img3.acsta.net/medias/nmedia/18/83/53/62/19695928.jpg',
    },
  ];

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresUrl();
    this.buscarpeliculas(this.form.value);

    this.form.valueChanges.subscribe((valores) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarpeliculas(valores);
      this.escribirParametrosBusquedaEnUrl();
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
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.titulo.indexOf(valores.titulo) !== -1
      );
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.generos.indexOf(valores.generoId) !== -1
      );
    }

    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.proximosEstrenos
      );
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter((pelicula) => pelicula.enCines);
    }
  }

  limpiar() {
    this.form.patchValue(this.formularioOriginal);
  }
}
