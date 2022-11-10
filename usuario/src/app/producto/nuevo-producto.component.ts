import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  cont: number=0;

  nombre = '';
  existencias: number = null;

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCreate(): void {
    this.cont++;
    const producto = new Producto(this.nombre, this.existencias);
    this.productoService.save(producto).subscribe(
      data => {
        this.cont=0;
        this.toastr.success('Producto Creado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
      },
      err => {
        if(this.cont<4){
          this.onCreate();
        }
        else{
          this.cont=0;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-right',

        });

      }
    }
    );
  }

}
