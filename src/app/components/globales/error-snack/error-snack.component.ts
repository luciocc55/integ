import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack',
  templateUrl: './error-snack.component.html',
  styleUrls: ['./error-snack.component.scss']
})
export class ErrorSnackComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }

  ngOnInit(): void {
  }

}
