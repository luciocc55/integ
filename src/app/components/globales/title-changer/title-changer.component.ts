import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-title-changer',
  templateUrl: './title-changer.component.html',
  styleUrls: ['./title-changer.component.scss'],
})
export class TitleChangerComponent implements OnChanges {
  @Input() title!: string;
  constructor(private titleService: Title) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}
}
