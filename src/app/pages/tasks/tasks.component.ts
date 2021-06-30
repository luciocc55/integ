import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { TasksActions } from 'src/app/store/tasks/tasks.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}
  prof() {
    this.store.dispatch(new TasksActions.Profesionales());
  }
  esp() {
    this.store.dispatch(new TasksActions.Especialidades());
  }
  dir() {
    this.store.dispatch(new TasksActions.Direcciones());
  }
  est() {
    this.store.dispatch(new TasksActions.Estudios());
  }
  equip() {
    this.store.dispatch(new TasksActions.Equipos());
  }
  profesp() {
    this.store.dispatch(new TasksActions.ProfesionalesEspecialidades());
  }
  os() {
    this.store.dispatch(new TasksActions.Os());
  }
}
