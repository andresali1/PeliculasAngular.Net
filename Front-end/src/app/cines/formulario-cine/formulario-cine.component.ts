import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { cineCreacionDTO } from '../cine';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  modelo: cineCreacionDTO;

  @Output()
  datos: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            primeraLetraMayuscula(),
          ],
        },
      ],
      latitud: ['', { validators: [Validators.required] }],
      longitud: ['', { validators: [Validators.required] }],
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({
        latitud: this.modelo.latitud,
        longitud: this.modelo.longitud,
      });
    }
  }

  obtenerErrorCampoNombre() {
    var campo = this.form.get('nombre');
    if (campo.hasError('required')) {
      return 'El campo Nombre es requerido';
    }
    if (campo.hasError('minlength')) {
      return 'La longitud mínima es de 3 caracteres';
    }
    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  GuardarCoordenada(coordenada: Coordenada) {
    this.form.patchValue(coordenada);
  }

  guardarCambios() {
    this.datos.emit(this.form.value);
  }
}
