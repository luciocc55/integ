import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  constructor() {}

  decodeNombre(token: string) {
    return this.getDecodedToken(token)?.user;
  }
  decodeApellido(token: string) {
    return this.getDecodedToken(token)?.nombre;
  }
  decodeCliente(token: string) {
    return this.getDecodedToken(token)?.apellido;
  }
  decodeId(token: string) {
    return this.getDecodedToken(token)?.id;
  }
  decodeExpiration(token: string) {
    return this.getDecodedToken(token)?.exp;
  }
  private getDecodedToken(token: string): any {
    try {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }
}
