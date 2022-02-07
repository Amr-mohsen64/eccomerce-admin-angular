import { CategoriesService } from './../../Services/categories.service';
import { ICategory } from 'src/app/Models/icategory';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../Services/products.service';
import { IProduct } from 'src/app/Models/iproduct';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  catList: ICategory[] = []
  newProuct: IProduct = {} as IProduct

  id?: number;
  header: string | undefined;

  obs?: Subscription;

  constructor(
    private prodService: ProductsService,
    private catService: CategoriesService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {

    //get Categories
    this.catService.getAllCategories()
      .subscribe(cats => {
        this.catList = cats
      })
  }

  //add
  addProduct() {
    let observer = {
      next: (prd: IProduct) => {
        alert("Product added Successfuly");
        this.router.navigateByUrl('/Products');
      },
      error: (err: Error) => alert(err.message)
    }
    this.prodService.addProduct(this.newProuct).subscribe(observer)
  }

  //update
  updateProduct() {
    this.prodService
      .updateProduct(this.id!, this.newProuct)
      .subscribe((data) => {
        alert("Product updated Successfuly");
        this.router.navigateByUrl('/Products');
      });
  }

  //submit
  onSubmit(form: NgForm) {
    if (this.id === 0) {
      this.addProduct()
    } else {
      this.updateProduct()
    }
  }

  ngOnInit(): void {

    this.id = Number(this.actRoute.snapshot.params['pid']);
    this.header = this.id == 0 ? 'add Product' : 'edit Product'

    if (this.id != 0) {
      this.obs = this.prodService.getProductById(this.id).subscribe((prod) => this.newProuct = prod)
    }
  }

  ngOnDestroy() {
    //unsbscirbe
    this.obs?.unsubscribe()
  }
}
