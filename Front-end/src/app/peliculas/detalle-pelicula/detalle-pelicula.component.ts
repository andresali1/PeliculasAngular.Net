import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { PeliculaDTO } from '../pelicula';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
import { RatingService } from 'src/app/utilidades/rating/rating.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],
})
export class DetallePeliculaComponent implements OnInit {
  pelicula: PeliculaDTO;
  fechaLanzamiento: Date;
  trailerUrl: SafeResourceUrl;
  coordenadas: CoordenadaConMensaje[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculasService.obtenerPorId(params.id).subscribe((pelicula) => {
        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        this.trailerUrl = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map((cine) => {
          return {
            longitud: cine.longitud,
            latitud: cine.latitud,
            mensaje: cine.nombre,
          };
        });
      });
    });
  }

  rated(puntuacion: number) {
    this.ratingService.rate(this.pelicula.id, puntuacion).subscribe(() => {
      alert('Su voto ha sido recibido!');
    });
  }

  generarURLYoutubeEmbed(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }

    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&');

    if (posicionAmpersand !== -1) {
      video_id = video_id.substring(0, posicionAmpersand);
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video_id}`
    );
  }
}
