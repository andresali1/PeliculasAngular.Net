import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent {
  constructor(private router: Router) {}

  guardarCambios(genero: generoCreacionDTO): void {
    //..Guardar Cambios
    console.log(genero);
    this.router.navigate(['/generos']);
  }
}
