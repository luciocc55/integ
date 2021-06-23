import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CuentasActions } from 'src/app/store/cuentas/cuentas.actions';
import { GlobalActions } from 'src/app/store/global/global.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.loginForm.controls.usuario.valueChanges.subscribe((data) => {
      if (data.indexOf(' ') >= 0) {
        this.loginForm.controls.usuario.setValue(data.trimStart().trimEnd());
      }
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.store
        .dispatch(
          new CuentasActions.Login(
            this.loginForm.controls.password.value,
            this.loginForm.controls.usuario.value
          )
        )
        .subscribe(
          (success) => {
            this.router.navigate(['home']);
          },
          (err) => {
            this.store.dispatch(new GlobalActions.OpenAlert(err));
          }
        );
    }
  }
}
