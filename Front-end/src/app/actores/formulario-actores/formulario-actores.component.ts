import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css'],
})
export class FormularioActoresComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;
  @Input()
  modelo: actorDTO;

  @Output() EnviarDatos: EventEmitter<actorCreacionDTO> =
    new EventEmitter<actorCreacionDTO>();

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
      fechaNacimiento: '',
      foto: '',
      biografia: '',
    });

    if (this.modelo != undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  obtenerErrorCampoNombre() {
    let campo = this.form.get('nombre');
    if (campo.hasError('required')) {
      return 'El campo Nombre es requerido';
    }
    if (campo.hasError('minlength')) {
      return 'La longitud minima es de 3 caracteres';
    }
    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }
    return '';
  }

  archivoSeleccionado(file) {
    this.form.get('foto').setValue(file);
  }

  cambioMarkdown(texto: string) {
    this.form.get('biografia').setValue(texto);
  }

  OnSubmit() {
    this.EnviarDatos.emit(this.form.value);
  }
}
