import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  constructor() {}

  modelo: cineDTO = {
    nombre: 'Palatino',
    latitud: 4.715677396176944,
    longitud: -74.0292799472809,
  };

  ngOnInit(): void {}

  guardarCambios(cine: cineCreacionDTO) {
    console.log(cine);
  }
}
