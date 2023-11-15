import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  constructor() {}

  modelo: PeliculaDTO = {
    titulo: 'Deadpool',
    trailer: 'abc',
    enCines: true,
    resumen: 'Bueena',
    fechaLanzamiento: new Date(),
    poster: 'https://es.web.img3.acsta.net/pictures/18/04/26/11/50/5029006.jpg',
  };

  ngOnInit(): void {}

  guardarCambios(pelicula: PeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
