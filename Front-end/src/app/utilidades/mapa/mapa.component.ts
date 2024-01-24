import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  LeafletMouseEvent,
  Marker,
  icon,
  latLng,
  marker,
  tileLayer,
} from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  constructor() {}

  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> =
    new EventEmitter<Coordenada>();

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 14,
    center: latLng(4.596284588435294, -74.07257080078126),
  };

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      let marcador = marker([valor.latitud, valor.longitud]);

      if (valor.mensaje) {
        marcador.bindPopup(valor.mensaje, { autoClose: false, autoPan: false });
      }

      return marcador;
    });

    if (this.coordenadasIniciales.length > 0) {
      this.options.center = latLng(
        this.coordenadasIniciales[0].latitud,
        this.coordenadasIniciales[0].longitud
      );
    }
  }

  capas: Marker<any>[] = [];

  manejarClick(event: LeafletMouseEvent) {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    if (!this.soloLectura) {
      this.capas = [];
      this.capas.push(
        marker([latitud, longitud], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'marker-icon.png',
            iconRetinaUrl: 'marker-icon.png',
            shadowUrl: 'assets/marker-shadow.png',
          }),
        })
      );
      this.coordenadaSeleccionada.emit({
        latitud: latitud,
        longitud: longitud,
      });
    }
  }
}
