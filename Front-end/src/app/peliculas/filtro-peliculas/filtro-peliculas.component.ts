import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
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
      titulo: 'SpiderMan',
      enCines: true,
      proximosEstrenos: false,
      generos: [2, 3],
      poster:
        'https://play-lh.googleusercontent.com/MvfGP_wh_Peqm5w0LJEaohuWPItwxkAFoIaj3SeVOc08_OEH468DEGChvF2dCudUj6Xy',
    },
    {
      titulo: 'Mohana',
      enCines: false,
      proximosEstrenos: true,
      generos: [2],
      poster:
        'https://images.moviesanywhere.com/5b2c656f643292cfd35771668badc820/44dda68f-dfb2-4974-97aa-239f27e6951f.jpg',
    },
    {
      titulo: 'Avengers',
      enCines: true,
      proximosEstrenos: false,
      generos: [2, 3],
      poster:
        'https://images.moviesanywhere.com/a36700f2ab20c7d495566843eea79dde/745c9b06-af55-4510-836d-9a320a3f26f9.jpg',
    },
    {
      titulo: 'Inception',
      enCines: false,
      proximosEstrenos: true,
      generos: [1],
      poster:
        'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
    },
    {
      titulo: 'Rockie 5',
      enCines: true,
      proximosEstrenos: false,
      generos: [1, 2],
      poster:
        'https://play-lh.googleusercontent.com/f8yPeTFYv3xr48xgY8tlvi3fGhpyr1jCJPcQn-_Z5wotLWiKArP9vVhapOqY6qhKchLNEg',
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
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form = this.formBuilder.group({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false,
    });

    this.form.valueChanges.subscribe((valores) => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    });
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      let objeto: any = {};

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

  private escribirParametrosBusquedaEnURL() {
    let queryStrings = [];
    let valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != '0') {
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

  buscarPeliculas(valores: any): void {
    if (valores.titulo) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.titulo.indexOf(valores.titulo) !== -1
      );
    }

    if (valores.generoId) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.generos.indexOf(valores.generoId) !== 1
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

  limpiar(): void {
    this.form.patchValue(this.formularioOriginal);
  }
}
