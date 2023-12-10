import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userName = localStorage.getItem('name');
  isLoding: boolean = false;
  isOrder = false;
  orderAryy = localStorage.getItem('AllUserChackOut');
  orders: any[] = [];
  constructor(public globle: GlobleService) {
    if (this.orderAryy) {
      this.orders = JSON.parse(this.orderAryy);
      this.isOrder = true;
      console.log(this.orderAryy);
    }
  }
  proFileFrom = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });
  ngOnInit() {
    this.globle.proFile().subscribe(
      (res) => {
        this.proFileFrom.patchValue(res);
        // console.log(res);
      },
      (err) => {},
      () => {
        this.isLoding = true;
      }
    );
  }
}
