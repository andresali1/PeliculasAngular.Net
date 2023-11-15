import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  modelo: actorDTO = {
    nombre: 'Camilo',
    fechaNacimiento: new Date(),
    foto: 'https://concepto.de/wp-content/uploads/2018/08/persona-e1533759204552.jpg',
    biografia: 'El actor mas novedoso de Hollywood'
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      // alert(params.id);
    });
  }

  guardarCambios(actor: actorCreacionDTO) {
    console.log(actor);
  }
}
