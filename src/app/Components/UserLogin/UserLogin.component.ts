import { Router } from '@angular/router';
import { UserAuthService } from './../../Services/user-auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-UserLogin',
  templateUrl: './UserLogin.component.html',
  styleUrls: ['./UserLogin.component.scss']
})
export class UserLoginComponent implements OnInit {

  isUserLogged: boolean = false;

  userName:any ;
  password:any;

  
  constructor(private authService: UserAuthService ,private router: Router) { }


  login() {
    this.authService.login(this.userName, this.password)
    this.isUserLogged = this.authService.isUserLogged;
    this.router.navigate(['/Home'])
  }

  logout() {
    this.authService.logout()
    this.isUserLogged = this.authService.isUserLogged;
  }

  ngOnInit() {
    this.isUserLogged = this.authService.isUserLogged;
    console.log(this.userName);
  }

}
