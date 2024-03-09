import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj : any = {
    "email": "",
    "password" : ""
  }

  constructor(private httpClient:HttpClient, private router: Router){

  }

  onLogin() {
    this.httpClient.post('http://localhost:5065/api/Auth/Login', this.loginObj)
    .subscribe((res:any) => {
      if(res.succeeded){
        localStorage.setItem('loginToken', res.data.token)
        this.router.navigateByUrl('/dashboard')
      }
      else{
        alert(res.error)
      }
    })
  }

}
