import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Routes } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';

const canActivateFunction: CanActivateFn = async (_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const fb = inject(FirebaseService);

  await fb.auth.authStateReady();
  return !!fb.auth.currentUser;
};

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [canActivateFunction],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
