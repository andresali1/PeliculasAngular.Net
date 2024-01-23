import { cineDTO } from '../cines/cine';
import { generoDTO } from '../generos/genero';

export interface PeliculaDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: string;
}

export interface PeliculaCreacionDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: File;
}

export interface PeliculaPostGet {
  generos: generoDTO[];
  cines: cineDTO[];
}
