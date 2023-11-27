import { Component } from '@angular/core';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  isLoding: boolean = false;
  constructor(private globle: GlobleService) {
    let productDetails = localStorage.getItem('productDetails');
    if (productDetails) {
      this.product = JSON.parse(productDetails);
      this.isLoding = true;
    }
  }

  product: any = this.globle.productDetails;
}
