import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  generosNoSeleccionados: MultipleSelectorModel[];
  cinesNoSeleccionados: MultipleSelectorModel[];
  errores: string[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      (resultado) => {
        this.generosNoSeleccionados = resultado.generos.map((genero) => {
          return <MultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombre,
          };
        });

        this.cinesNoSeleccionados = resultado.cines.map((cine) => {
          return <MultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
      },
      (error) => console.error(error)
    );
  }

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    this.peliculasService.crear(pelicula).subscribe(
      (id: number) => this.router.navigate(['/pelicula/' + id]),
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
