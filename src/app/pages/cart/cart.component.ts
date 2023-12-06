import { Component } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  fatimes = faMinus;
  faX = faX;
  productCart: any[] = [];
  arryCount: any = 0;
  allPrice: any = 0;
  emptyCart = true;
  inStock = true;
  getAllPrice() {
    this.allPrice = 0;
    this.productCart.forEach((ele) => {
      this.allPrice += ele.price * ele.quantity;
    });
  }
  constructor(private service: GlobleService, private toaster: ToastrService) {
    let productCartinLoc = localStorage.getItem('cart');
    if (productCartinLoc) {
      this.productCart = JSON.parse(productCartinLoc);
      this.arryCount = JSON.parse(productCartinLoc).length;
      this.emptyCart = false;
    }
    this.getAllPrice();
    this.service.itemsInCart = this.productCart.length;
    if (this.productCart.length == 0) {
      localStorage.removeItem('cart');
      this.emptyCart = true;
    }
  }

  hundelPlus(i: any) {
    if (this.productCart[i].stock == 0) {
      this.inStock = false;
      this.toaster.error(
        `Not Available You Cant Add More then ${this.productCart[i].quantity}`
      );

      return;
    }
    this.productCart[i].quantity += 1;
    this.productCart[i].stock -= 1;

    console.log(this.productCart[i].stock);
    localStorage.setItem('cart', JSON.stringify(this.productCart));
    this.getAllPrice();
  }
  hundelMinus(i: any) {
    if (this.productCart[i].quantity <= 1) {
      this.productCart[i].quantity = 0;
      this.productCart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(this.productCart));
      this.arryCount = this.productCart.length;
      this.service.itemsInCart = this.productCart.length;
      this.getAllPrice();
      if (this.arryCount == 0) {
        localStorage.removeItem('cart');
        this.emptyCart = true;
      }
      return;
    }
    this.productCart[i].quantity -= 1;
    this.productCart[i].stock += 1;
    localStorage.setItem('cart', JSON.stringify(this.productCart));
    this.getAllPrice();
  }
  hundelDelete(i: any) {
    this.productCart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.productCart));
    this.arryCount = this.productCart.length;
    this.getAllPrice();
    this.service.itemsInCart = this.productCart.length;
    if (this.productCart.length == 0) {
      localStorage.removeItem('cart');
      this.emptyCart = true;
    }
  }
}
