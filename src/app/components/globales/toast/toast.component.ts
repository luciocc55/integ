import { ApplicationRef, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
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
}
