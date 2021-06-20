import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new CuentasActions.Logout()).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
