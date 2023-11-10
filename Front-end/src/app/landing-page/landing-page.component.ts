import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  peliculasEnCines;
  peliculasProximas;

  ngOnInit(): void {
    this.peliculasEnCines = [
      {
        titulo: 'SpiderMan',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster:
          'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p29821_v_v13_au.jpg',
      },
      {
        titulo: 'Mohana',
        fechaLanzamiento: new Date('2012-10-02'),
        precio: 400.35,
        poster:
          'https://images.moviesanywhere.com/5b2c656f643292cfd35771668badc820/44dda68f-dfb2-4974-97aa-239f27e6951f.jpg',
      },
    ];

    this.peliculasProximas = [
      {
        titulo: 'Avengers',
        fechaLanzamiento: new Date('2018-09-06'),
        precio: 1900.99,
        poster:
          'https://images.moviesanywhere.com/a36700f2ab20c7d495566843eea79dde/745c9b06-af55-4510-836d-9a320a3f26f9.jpg',
      },
      {
        titulo: 'Inception',
        fechaLanzamiento: new Date('2010-03-12'),
        precio: 100.35,
        poster:
          'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      },
      {
        titulo: 'Rocky 5',
        fechaLanzamiento: new Date('1995-12-31'),
        precio: 90.1,
        poster:
          'https://flxt.tmsimg.com/assets/p12871_p_v13_av.jpg',
      },
    ];
  }
}
