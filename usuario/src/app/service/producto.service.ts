import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //productoURL = 'http://localhost:8080/producto/';
  URL2='http://localhost:8989/port';

  port: string="";
  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Producto[]> {
   this.Search();
   return this.httpClient.get<Producto[]>('http://'+this.port+'/producto/' +'lista');

  }

  public detail(id: number): Observable<Producto> {
    this.Search();
    return this.httpClient.get<Producto>('http://'+this.port+'/producto/' + `detail/${id}`);

   // return this.httpClient.get<Producto>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Producto> {
    this.Search();
    return this.httpClient.get<Producto>('http://'+this.port+'/producto/' + `detailName/${nombre}`);
   // return this.httpClient.get<Producto>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Producto): Observable<any> {
    this.Search();
    return this.httpClient.post<any>('http://'+this.port+'/producto/' + 'create', producto);
   // return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Producto): Observable<any> {
    this.Search();
    return this.httpClient.put<any>('http://'+this.port+'/producto/' + `update/${id}`, producto);
 //   return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    this.Search();
    return this.httpClient.delete<any>('http://'+this.port+'/producto/' + `delete/${id}`);
  //  return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
  

  Search(): void {
    this.httpClient.get(this.URL2, {responseType: 'text'}).subscribe(data => {
      this.port=data;
    });
  }
  
}
