import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDTO } from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  URL2='http://localhost:8989/port';

  port: string="";
  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    this.Search();
   // return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
   return this.httpClient.post<any>('http://'+this.port+'/auth/' + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
   this.Search();

    return this.httpClient.post<JwtDTO>('http://'+this.port+'/auth/' + 'login', loginUsuario);
  }

  Search(): void {
    this.httpClient.get(this.URL2, {responseType: 'text'}).subscribe(data => {
      this.port=data;
    });
  }
}
