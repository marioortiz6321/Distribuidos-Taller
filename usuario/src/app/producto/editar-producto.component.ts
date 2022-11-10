import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/producto';
import { ProductoService } from '../service/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  cont: number=0;

  producto: Producto = null;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cont++;
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.detail(id).subscribe(
      data => {
        this.cont=0;
        this.producto = data;
      },
      err => {

        if(this.cont<4){
          this.ngOnInit();
        }
        else{
        this.cont=0;
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-right',
        });
        this.router.navigate(['/']);
      }
    }
    );
  }

  onUpdate(): void {
    this.cont++;
    const id = this.activatedRoute.snapshot.params.id;
    this.productoService.update(id, this.producto).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-right'
        });
        this.router.navigate(['/lista']);
      },
      err => {
        if(this.cont<4){
          this.onUpdate();
        }
        else{
        this.cont=0;
        this.toastr.error(err.error.mensaje, 'Fail', {
        timeOut: 3000,  positionClass: 'toast-top-right',
        });
        // this.router.navigate(['/']);
      }
    }
    );
  }

}
