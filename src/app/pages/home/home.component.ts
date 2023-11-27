import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: any[] = [];
  constructor(private globle: GlobleService) {}
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplaySpeed: 300,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit() {
    this.globle.getAllProdects().subscribe((res) => {
      console.log(res);
      this.products = res.products;
    });
  }
}
