import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionListComponent } from './components/action-list/action-list.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { LoginComponent } from './components/login/login.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
  {
    path: 'index.html',
    redirectTo: '',
    pathMatch: 'full'
  },
  {path: 'detectors', component: DetectorListComponent /*, canActivate: [IsLoggedInGuard]*/},
  {path: 'actions', component: ActionListComponent /*, canActivate: [IsLoggedInGuard]*/},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
