import {
  ApplicationRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast-pregunta',
  templateUrl: './toast-pregunta.component.html',
  styleUrls: ['./toast-pregunta.component.scss'],
})
export class ToastPreguntaComponent implements OnInit {
  @Output() decision = new EventEmitter<any>(false);
  constructor(
    private snackBar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public applicationRef: ApplicationRef
  ) {}

  ngOnInit(): void {}
  close() {
    this.snackBar.dismiss();
    setTimeout(() => {
      this.applicationRef.tick();
    }, 50);
  }
  confirmacion() {
    this.snackBar.dismiss();
    this.decision.emit(true);
    setTimeout(() => {
      this.applicationRef.tick();
    }, 50);
  }
  cancelacion() {
    this.snackBar.dismiss();
    this.decision.emit(false);
    setTimeout(() => {
      this.applicationRef.tick();
    }, 50);
  }
}
