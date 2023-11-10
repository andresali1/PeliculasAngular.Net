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
    nombre: 'Juan',
    fechaNacimiento: new Date(),
    foto: 'https://elcomercio.pe/resizer/caCMkq8So8AZfe8s7QMkUnxilPA=/1200x900/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/N54U3HPM4JGH7JMZSAU6K635N4.jpg'
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      //alert(params.id);
    });
  }

  guardarCambios(actor: actorCreacionDTO){
    console.log(actor);
  }
}
