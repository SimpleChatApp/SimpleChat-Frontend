import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuardService]},
  { path: 'chat', loadChildren: () => import('./product/product.module').then(m => m.ProductModule), canActivate: [AuthGuardService] },
  { path: 'search', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuardService] },  

  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
