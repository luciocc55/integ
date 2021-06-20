import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MergeosState, ToMerge } from 'src/app/store/mergeos/mergeos.state';

@Component({
  selector: 'app-mergeo-button',
  templateUrl: './mergeo-button.component.html',
  styleUrls: ['./mergeo-button.component.scss'],
})
export class MergeoButtonComponent implements OnInit {
  @Select(MergeosState.existMaster)
  existMaster$!: Observable<boolean>;
  @Select((state: any) => state.mergeos.selected)
  selected$!: Observable<ToMerge[]>;
  @Output() mergear = new EventEmitter<any>(false);
  constructor() {}

  ngOnInit(): void {}
}
