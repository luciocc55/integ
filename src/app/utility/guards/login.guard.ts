import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngxs/store';
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  // Verifica antes de cada Url que el token no haya expirado
  // la funcion es una libreria de angular JwtHelperService isTokenExpired
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const token = this.store.selectSnapshot((state) => state.cuentas.token);
    if (token) {
      this.router.navigate(['home']);
      return false;
    } else {
      return true;
    }
  }
}
