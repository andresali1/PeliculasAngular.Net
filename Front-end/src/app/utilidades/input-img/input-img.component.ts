import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css'],
})
export class InputImgComponent implements OnInit {
  constructor() {}

  imagenBase64: string;

  @Input()
  urlImagenActual: string;

  @Output()
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  ngOnInit(): void {}

  guardarImagen(evento) {
    if (evento.target.files.length > 0) {
      const file: File = evento.target.files[0];
      toBase64(file)
        .then((valor: string) => (this.imagenBase64 = valor))
        .catch((error) => console.log(error));
      this.archivoSeleccionado.emit(file);
      this.urlImagenActual = null;
    }
  }
}
