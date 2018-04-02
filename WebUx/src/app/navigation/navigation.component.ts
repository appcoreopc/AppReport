import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private isSignedOn : boolean = false;

  constructor(private authService : AuthService) { }

  ngOnInit() {    

  }

  ngAfterViewInit()	{

    console.log('checking if user is signed on', this.authService.isLogin);
    this.isSignedOn = this.authService.isLogin;

  }
}
