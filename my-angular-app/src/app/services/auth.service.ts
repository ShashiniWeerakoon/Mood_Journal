import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly validUsername = 'admin';
  private readonly validPassword = '1234';
  isAuthenticated = false;

  login(username: string, password: string): boolean {
    if (username === this.validUsername && password === this.validPassword) {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }
}
