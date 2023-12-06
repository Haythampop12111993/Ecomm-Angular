import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  product: any = this.globle.productDetails;
  productCart = localStorage.getItem('cart');
  productQuantity = 1;
  isLoding: boolean = false;
  ReallyAvailable: any;
  arryOfCart: any[] = [];
  constructor(private globle: GlobleService, private toaster: ToastrService) {
    let productDetails = localStorage.getItem('productDetails');
    if (productDetails) {
      if (this.productCart) {
        this.arryOfCart = JSON.parse(this.productCart);
        for (let i = 0; i < this.arryOfCart.length; i++) {
          if (this.arryOfCart[i].id == this.product.id) {
            this.product.stock -= this.arryOfCart[i].quantity;
            localStorage.setItem(
              'productDetails',
              JSON.stringify(this.product)
            );
            this.isLoding = true;
            return;
          }
        }
      }
      this.product = JSON.parse(productDetails);
      this.isLoding = true;
    }
  }
  hundelModal() {
    let modalId: any = document.getElementById('hundelModal');
    modalId.style.display = 'block';
  }
  hundelCart() {
    this.product.quantity = Number(this.productQuantity);
    if (this.productQuantity > this.product.stock) {
      this.toaster.error(
        `Not Available You Cant Add More then ${this.product.stock}`
      );
      return;
    }
    console.log(this.product);
    if (this.productCart) {
      let cart: any[] = JSON.parse(this.productCart);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == this.product.id) {
          cart[i].quantity += this.product.quantity;
          this.product.stock -= this.product.quantity;
          cart[i].stock = this.product.stock;
          console.log(cart[i].stock);
          localStorage.setItem('cart', JSON.stringify(cart));
          this.hundelModal();
          return;
        }
      }
      cart.push(this.product);
      this.product.stock -= this.product.quantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      this.globle.itemsInCart = cart.length;
      this.hundelModal();
      return;
    } else {
      let cart: any[] = [];
      this.product.stock -= this.product.quantity;
      cart.push(this.product);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.globle.itemsInCart = cart.length;
      this.hundelModal();
    }
  }
}
