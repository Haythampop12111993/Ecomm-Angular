import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobleService } from 'src/app/services/globle.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  isSubmited = false;
  isErr = false;
  obj: any = {};
  constructor(private globle: GlobleService) {}
  registerFrom = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
  });
  get Controls() {
    return this.registerFrom.controls;
  }
  hundelRegister() {
    this.obj = {
      name: this.registerFrom.controls.name.value,
      email: this.registerFrom.controls.email.value,
      password: this.registerFrom.controls.password.value,
    };
    console.log(this.registerFrom.value);
    this.isSubmited = true;
    if (this.registerFrom.valid) {
      this.globle.Register(this.obj).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          this.isErr = true;
        }
      );
    }
  }
  hundelInput() {
    this.isSubmited = false;
  }
}
