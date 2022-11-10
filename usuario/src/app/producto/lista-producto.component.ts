import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {

  cont: number=0;


  productos: Producto[] = [];
  roles: string[];
  isAdmin = false;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProductos(): void {
    this.cont++;
    this.productoService.lista().subscribe(
      data => {
        this.cont=0;
        this.productos = data;
      },
      err => {
        if(this.cont<4){
        this.cargarProductos();
        }
        else{
        this.cont=0;       
        this.toastr.error(err.error.mensaje, 'Fail', {
        timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
      }
    );
  }

  borrar(id: number) {
    this.cont++;
    this.productoService.delete(id).subscribe(
      data => {
        this.cont=0;
        this.toastr.success('Producto Eliminado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarProductos();
      },
      err => {
        if(this.cont<4){
        this.borrar(id);
        }
        else{
        this.cont=0;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    }
    );
  }
  ComprarProducto(id:number,nombre:string,existencias:string){
    this.cont++;
    const num =parseInt(existencias)-1;
    if(num==0){
      this.borrar(id);
    }
   else{
    const NewProducto={nombre: nombre,existencias: num};
    this.productoService.update(id,NewProducto).subscribe(
      data => {
        this.cont=0;
        this.toastr.success('Producto Comprado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        this.cargarProductos();
      },
      err => {
        if(this.cont<4){
        this.ComprarProducto(id,nombre,existencias);
        }
        else{
          this.cont=0;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-right',
        });
      }
    }
    );
  }
}

}
