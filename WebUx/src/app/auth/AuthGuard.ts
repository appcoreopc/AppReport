
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,  RouterStateSnapshot }  from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { HttpClient } from '@angular/common/http';
import {AuthService} from "./auth-service.service";
import { APPLICATION_HOST } from '../sharedObjects/applicationSetup';
import {  headersJson , LOGIN_SUCCESS, LOGIN_ERR } from '../sharedObjects/sharedMessages';


@Injectable()
export class AuthGuard implements CanActivate {
  
  isLoggedIn = false;
  redirectUrl: string;  

  constructor(private router : Router, private authService : AuthService,
     private http: HttpClient)
  {    
   
  }  

  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):boolean 
    {       
      if (this.authService.isLogin)
      { 
        return true;
      }
      else 
      {
        this.router.navigate(['/login']);
      }
      return false; 
    }
  }