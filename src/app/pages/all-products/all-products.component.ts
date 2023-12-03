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
  val: string = '';
  constructor(private globle: GlobleService, private router: Router) {}
  ngOnInit() {
    this.globle.getAllProdects().subscribe(
      (res) => {
        console.log(res);
        this.allProducts = res.products;
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
    console.log(this.Category);
    this.globle.getProductsOfCategory(this.Category).subscribe((res) => {
      console.log(res);
      this.productsOfCategory = res.products;
      this.newArry = this.productsOfCategory;
      this.isCategory = true;
    });
  }
  hundelSearch() {
    this.val.trim();
    if (this.isCategory == false) {
      this.newArry = this.allProducts;
      this.newArry = this.allProducts.filter((res) => {
        return res.title
          .toLowerCase()
          .trim()
          .includes(this.inputVal.toLowerCase().trim());
      });
    } else {
      this.newArry = this.productsOfCategory;
      this.newArry = this.productsOfCategory.filter((res) => {
        return res.title
          .toLowerCase()
          .trim()
          .includes(this.inputVal.toLowerCase().trim());
      });
    }
  }
}
