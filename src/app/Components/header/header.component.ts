import { Router } from '@angular/router';
import { UserAuthService } from './../../Services/user-auth.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  isUserLogged: boolean = false;

  userName: string;

  constructor(private authService: UserAuthService , private router:Router) {
    this.userName = localStorage.getItem("userName") || '';
  }

  logout() {
    this.authService.logout()
    this.isUserLogged = this.authService.isUserLogged;
    this.router.navigate(['/Login'])
  }

  ngOnInit(): void {
    // this.isUserLogged = this.authService.isUserLogged
    this.authService.getLoggedStatus().subscribe(status => {
      this.isUserLogged = status
      this.userName = localStorage.getItem("userName") || '';
    })



  }

  ngOnChanges(): void {
    
  }
}
