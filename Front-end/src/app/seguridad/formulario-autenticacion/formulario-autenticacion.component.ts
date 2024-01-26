import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css'],
})
export class FormularioAutenticacionComponent implements OnInit {
  form: FormGroup;

  @Input()
  accion: string;

  @Input()
  errores: string[] = [];

  @Output()
  datos: EventEmitter<credencialesUsuario> =
    new EventEmitter<credencialesUsuario>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  obtenerMensajeErrorEmail() {
    var campo = this.form.get('email');

    if (campo.hasError('required')) {
      return 'El campo Email es requerido';
    }

    if (campo.hasError('email')) {
      return 'El Email no es válido';
    }
  }
}
