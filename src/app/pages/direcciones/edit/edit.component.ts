import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, AfterViewInit {
  @ViewChild('editDialog')
  editDialog!: TemplateRef<any>;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngAfterViewInit(): void {
    const dialogRef = this.dialog.open(this.editDialog, {
      panelClass: 'customModal',
      width: '100%',
      height: '80%',
      data: {},
    });
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }

  ngOnInit(): void {}
}
