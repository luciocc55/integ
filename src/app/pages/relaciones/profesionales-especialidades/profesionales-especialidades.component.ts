import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GlobalActions } from 'src/app/store/global/global.actions';
import { ParamsActions } from 'src/app/store/params/params.actions';
import { RelacionesActions } from 'src/app/store/relaciones/relaciones.actions';
import { Registro } from 'src/app/store/relaciones/relaciones.state';

@Component({
  selector: 'app-profesionales-especialidades',
  templateUrl: './profesionales-especialidades.component.html',
  styleUrls: ['./profesionales-especialidades.component.scss'],
})
export class ProfesionalesEspecialidadesComponent implements OnInit {
  @Select((state: any) => state.params.search)
  search$!: Observable<string>;
  @ViewChild('modalNueva')
  nuevaRelacionModal!: TemplateRef<any>;
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const page = params.get('page') || '1';
      const pageSize = params.get('pageSize') || '25';
      const search = params.get('search') || '';
      this.store.dispatch([
        new ParamsActions.UpdateParams(search, page, pageSize),
        new RelacionesActions.LoadRelacionesProfEsp(),
      ]);
    });
    this.search$.subscribe((value) => {
      this.updateParams({ search: value, page: 1 });
    });
  }

  updateParams(params: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }
  finalizarRelacion() {
    const relaciones = this.store.selectSnapshot(
      (state) => state.relaciones.selected2
    );
    const profesional: Registro = this.store.selectSnapshot(
      (state) => state.relaciones.selected1
    );
    const promises: any = [];
    relaciones.forEach((element: Registro) => {
      promises.push(
        new RelacionesActions.GuardarRelacionesProfEsp(
          profesional.id,
          element.id
        )
      );
    });
    this.store.dispatch(promises).subscribe(() => {
      this.store.dispatch(new GlobalActions.OpenSuccess('toast.successTitle'));
    });
  }
  nuevaRelacion() {
    this.dialog.open(this.nuevaRelacionModal, {
      autoFocus: false,
      width: '100%',
    });
  }
  remover(idRelacion: number) {
    this.store.dispatch(
      new RelacionesActions.DeleteRelacionProfEsp(idRelacion)
    );
  }
  buscarProfs() {
    this.store.dispatch(new RelacionesActions.LoadProfesionales('busqueda1'));
  }
  buscarEsps() {
    this.store.dispatch(new RelacionesActions.LoadEspecialidades('busqueda2'));
  }
  closeModal() {
    this.dialog.closeAll();
  }
}
