import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}
  // example use of guard
  //  { path: 'special', component: SpecialPage, canActivate: [AuthGuard] },

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      //const loggedIn = false; // replace with actual user auth checking logic
    let user = localStorage.getItem('loggedIn');
     console.log({user});
      if (!user) {
        this.router.navigate(['/login'], { skipLocationChange: true });
      }

      return true;
    
  }

}
