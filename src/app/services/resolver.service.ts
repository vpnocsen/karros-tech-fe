import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { category } = route.params;
    const { genres } = route.queryParams;
    return { category, genres }
  }
}
