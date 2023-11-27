import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobleService } from 'src/app/services/globle.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    public serv: GlobleService,
    private toaster: ToastrService,
    private router: Router
  ) {}
  loginFrom = new FormGroup({
    email: new FormControl('Haytham@gmail.com', [Validators.required]),
    password: new FormControl('123456', [Validators.required]),
  });
  hundelSubmit() {
    console.log(this.loginFrom.value);
    if (this.loginFrom.valid) {
      this.serv.Login(this.loginFrom.value).subscribe((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.Token);
        localStorage.setItem('name', res.data.Name);
        localStorage.setItem('userId', res.data.Id);
        this.router.navigateByUrl('/');
        this.toaster.success(`LoginSuccess!! Welcome ${res.data.Name}`);
        this.serv.isLogin = true;
        this.serv.userName = res.data.Name;
      });
    }
  }
}
