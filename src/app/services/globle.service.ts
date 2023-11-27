import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobleService {
  isLogin = false;
  userName: any = null;
  productDetails: any = {};
  userId = localStorage.getItem('userId');
  constructor(private http: HttpClient) {}
  Login(body: any): Observable<any> {
    return this.http.post(
      'http://restapi.adequateshop.com/api/authaccount/login',
      body
    );
  }
  Register(body: any): Observable<any> {
    return this.http.post(
      'http://restapi.adequateshop.com/api/authaccount/registration',
      body
    );
  }
  proFile(): Observable<any> {
    return this.http.get(
      `http://restapi.adequateshop.com/api/users/${this.userId}`
    );
  }
  getAllProdects(): Observable<any> {
    return this.http.get('https://dummyjson.com/products');
  }
  getProductDetails(id: any): Observable<any> {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }
}
