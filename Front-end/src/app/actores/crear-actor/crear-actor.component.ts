import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent {
  constructor(private router: Router) {}

  guardarCambios(): void {
    //..Guardar Cambios
    this.router.navigate(['/actores']);
  }
}
