import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { actorPeliculaDTO } from 'src/app/actores/actor';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  modelo: PeliculaDTO;

  @Output()
  datos: EventEmitter<PeliculaCreacionDTO> =
    new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[];

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[];

  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            primeraLetraMayuscula(),
          ],
        },
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: '',
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  obtenerErrorCampoTitulo() {
    var campo = this.form.get('titulo');
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

  obtenerArchivo(archivo: File) {
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  obtenerResumen(texto: string) {
    this.form.get('resumen').setValue(texto);
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map((val) => val.llave);
    this.form.get('generosIds').setValue(generosIds);
    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map((val) => {
      return { id: val.id, personaje: val.personaje };
    });
    this.form.get('actores').setValue(actores);

    if (!this.imagenCambiada) {
      this.form.patchValue({ poster: null });
    }

    this.datos.emit(this.form.value);
  }
}
