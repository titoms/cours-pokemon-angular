import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:3000/api/users/login';
  constructor(private router: Router, private httpClient: HttpClient) { }

  login(email:string, password:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type' : 'application/json'})
    }
    return this.httpClient.post<string>(this.loginUrl, {email, password}, httpOptions).pipe(
      tap(res => {
        localStorage.setItem('token', res);
        this.router.navigate(['/pokemons']);
      }),
      catchError(error => {
        console.error('Login error', error);
        return error;
      })
    )
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
