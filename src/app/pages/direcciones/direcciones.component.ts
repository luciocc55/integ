import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DireccionesActions } from 'src/app/store/direcciones/direcciones.actions';
import { ParamsActions } from 'src/app/store/params/params.actions';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {

  }


}
