import { ToastrService } from 'ngx-toastr';
import { ProductDetailsComponent } from './../product-details/product-details.component';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent {
  allProducts: any[] = [];
  total: number = 0;
  p: number = 1;
  isLoding: boolean = false;
  allCategories: any[] = [];
  Category: any = '';
  productsOfCategory: any[] = [];
  isCategory = false;
  inputVal: any = '';
  newArry: any[] = [];
  cartInLocal = localStorage.getItem('cart');
  cartArry: any[] = [];
  isStock: boolean = true;
  noCategories: any[] = [];
  constructor(
    private globle: GlobleService,
    private router: Router,
    private toaster: ToastrService
  ) {
    if (this.cartInLocal) {
      this.cartArry = JSON.parse(this.cartInLocal);
    }
  }
  ngOnInit() {
    this.globle.getAllProdects().subscribe(
      (res) => {
        console.log(res);
        this.allProducts = res.products;
        this.noCategories = this.allProducts;
        this.newArry = this.allProducts;
        this.total = res.total;
      },
      (err) => {},
      () => {
        this.isLoding = true;
      }
    );
    this.globle.getAllcategories().subscribe((res) => {
      this.allCategories = res;
    });
  }
  hundelDetalis(productId: any) {
    console.log(productId);
    this.globle.getProductDetails(productId).subscribe((res) => {
      this.globle.productDetails = res;
      localStorage.setItem('productDetails', JSON.stringify(res));
      // console.log(this.globle.productDetails);//
      this.router.navigateByUrl('/AllProducts/productDetails');
    });
  }
  hundelSelect() {
    if (this.Category == 'All Category') {
      console.log('not');
      this.newArry = this.allProducts;
      this.isCategory = false;
      this.p = 1;
    } else {
      console.log(this.Category);
      this.globle.getProductsOfCategory(this.Category).subscribe((res) => {
        console.log(res);
        this.productsOfCategory = res.products;
        this.newArry = this.productsOfCategory;
        this.isCategory = true;
        this.p = 1;
      });
    }
  }
  hundelSearch() {
    if (this.isCategory == false) {
      this.newArry = this.allProducts;
      this.p = 1;
      this.newArry = this.allProducts.filter((res) => {
        return res.title
          .toLowerCase()
          .trim()
          .includes(this.inputVal.toLowerCase().trim());
      });
    } else {
      this.newArry = this.productsOfCategory;
      this.p = 1;
      this.newArry = this.productsOfCategory.filter((res) => {
        return res.title
          .toLowerCase()
          .trim()
          .includes(this.inputVal.toLowerCase().trim());
      });
    }
  }
  hundelCart(obj: any) {
    if (obj.quantity == undefined) {
      obj.quantity = 1;
      obj.stock--;
    }
    console.log(obj);
    /////////////////////////////////////////////////////////////////////
    if (this.cartArry.length == 0) {
      this.cartArry.push(obj);
      localStorage.setItem('cart', JSON.stringify(this.cartArry));
      this.globle.itemsInCart = this.cartArry.length;
    } else {
      for (let i = 0; i < this.cartArry.length; i++) {
        if (this.cartArry[i].id === obj.id) {
          if (this.cartArry[i].stock == 0) {
            this.toaster.error(
              `Not Available You Cant Add More then ${this.cartArry[i].quantity}`
            );
            this.isStock = false;
            return;
          }
          this.cartArry[i].quantity++;
          this.cartArry[i].stock--;
          console.log(this.cartArry[i].stock);
          localStorage.setItem('cart', JSON.stringify(this.cartArry));
          return;
        }
      }
      this.cartArry.push(obj);
      localStorage.setItem('cart', JSON.stringify(this.cartArry));
      this.globle.itemsInCart = this.cartArry.length;
    }
    console.log(this.cartArry);
  }
}
