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
  constructor(public globle: GlobleService) {}
  proFileFrom = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });
  ngOnInit() {
    this.globle.proFile().subscribe(
      (res) => {
        this.proFileFrom.patchValue(res);
        console.log(res);
      },
      (err) => {},
      () => {
        this.isLoding = true;
      }
    );
  }
}
