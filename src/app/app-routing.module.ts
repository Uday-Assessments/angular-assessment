import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // To handle unknown routes. Ideally we would have a 404 page to provide a better experience
    path: '*',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'entry',
    pathMatch: 'full'
  },
  {
    // These are lazy loaded standalone components which are introduced v14 and stabilized in v15
    path: 'entry',
    loadComponent: () => import('./features/entry/entry.component').then(c => c.EntryComponent)
  },
  {
    path: 'confirmation',
    loadComponent: () => import('./features/confirmation/confirmation.component').then(c => c.ConfirmationComponent)
  },
  {
    path: 'thankyou',
    loadComponent: () => import('./features/thankyou/thankyou.component').then(c => c.ThankyouComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
