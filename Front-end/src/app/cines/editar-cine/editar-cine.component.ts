import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cine';
import { Router, ActivatedRoute } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  constructor(
    private router: Router,
    private cinesService: CinesService,
    private activatedRoute: ActivatedRoute
  ) {}

  modelo: cineDTO;
  errores: string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cinesService.obtenerPorId(params.id).subscribe(
        (cine) => {
          this.modelo = cine;
        },
        (error) => this.router.navigate(['/cines'])
      );
    });
  }

  guardarCambios(cine: cineCreacionDTO) {
    this.cinesService.editar(this.modelo.id, cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
