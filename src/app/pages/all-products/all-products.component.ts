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
  constructor(private globle: GlobleService, private router: Router) {}
  ngOnInit() {
    this.globle.getAllProdects().subscribe(
      (res) => {
        console.log(res);
        this.allProducts = res.products;
        this.total = res.total;
      },
      (err) => {},
      () => {
        this.isLoding = true;
      }
    );
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
}
