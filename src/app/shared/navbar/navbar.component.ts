import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobleService } from 'src/app/services/globle.service';
import { faFaceSmileWink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  userName: any = '';
  smile = faFaceSmileWink;
  constructor(
    public globle: GlobleService,
    private tosetr: ToastrService,
    private router: Router
  ) {
    let token = localStorage.getItem('token');
    if (token) {
      this.globle.isLogin = true;
    }
    let name = localStorage.getItem('name');
    if (name) {
      this.globle.userName = name;
    }
  }
  ngOnInit() {
    let name = localStorage.getItem('name');
    if (name) {
      this.userName = localStorage.getItem('name');
    }
  }
  hundelLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    this.router.navigateByUrl('/');

    this.globle.isLogin = false;
    this.tosetr.info('Logout Success');
  }
}
