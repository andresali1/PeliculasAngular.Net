import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css'],
})
export class AutocompleteActoresComponent implements OnInit {
  constructor() {}

  control: FormControl = new FormControl();
  actores = [
    {
      nombre: 'Tom Holland',
      personaje: '',
      foto: 'https://i.pinimg.com/474x/d9/12/d1/d912d1dfcefd58db8c689121303c8d13.jpg',
    },
    {
      nombre: 'Tom Hiddleston',
      personaje: '',
      foto: 'https://st.depositphotos.com/1814084/5066/i/950/depositphotos_50665065-stock-photo-tom-hiddleston.jpg',
    },
    {
      nombre: 'Elizabeth Olsen',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Elizabeth_Olsen_TIFF_2011a_%28cropped%29.jpg',
    },
    {
      nombre: 'Evangeline Lily',
      personaje: '',
      foto: 'https://media.revistavanityfair.es/photos/60e84c0b29af8ce08356da83/master/w_1600%2Cc_limit/39618.jpg',
    },
    {
      nombre: 'Cris Evans',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Chris_Evans_SDCC_2014.jpg/800px-Chris_Evans_SDCC_2014.jpg',
    },
    {
      nombre: 'Cris Hemsworth',
      personaje: '',
      foto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chris_Hemsworth_%288492541282%29.jpg/800px-Chris_Hemsworth_%288492541282%29.jpg',
    },
  ];

  actoresOriginal = this.actores;

  actoresSeleccionados = [];

  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe((valor) => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(
        (actor) => actor.nombre.indexOf(valor) !== -1
      );
    });
  }

  seleccionarOpcion(event: MatAutocompleteSelectedEvent) {
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    );

    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre == actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }
}
