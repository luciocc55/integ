import { Component, OnInit } from '@angular/core';
import { themes } from 'src/app/utility/themes';
import { ThemingService } from 'src/app/utility/theming.service';

@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.scss'],
})
export class DarkModeComponent implements OnInit {
  darkMode!: boolean;
  next!: string;
  constructor(private themingService: ThemingService) {}

  ngOnInit(): void {
    this.themingService.theme.subscribe((theme) => {
      this.darkMode = theme === themes[0] ? false : true;
      this.next = theme === themes[0] ? themes[1] : themes[0];
    });
  }
  turnTheme() {
    const next = this.next;
    this.themingService.theme.next(next);
    this.themingService.nextLocal(next);
  }
}
