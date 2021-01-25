import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReAuthGuard implements CanActivate {
  constructor(private router: Router, private api: ApiService) {}
  // example use of guard
  //  { path: 'special', component: SpecialPage, canActivate: [AuthGuard] },

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //const loggedIn = false; // replace with actual user auth checking logic
    let user = localStorage.getItem('loggedIn');
     console.log({user});
      if (user) {
        this.api.admin ? this.router.navigate(['/home'], { skipLocationChange: true }) : this.router.navigate(['/chat-room/'], { queryParams: { name: 'Messenger', id: user }, skipLocationChange: false });
        console.log('login', user);
      }

      return true;
    
  }
}
