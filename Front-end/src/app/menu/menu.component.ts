import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    public seguridadService: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cerrarSesion() {
    this.seguridadService.logout();
    this.router.navigate(['login']);
  }
}
