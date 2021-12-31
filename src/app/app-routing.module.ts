import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionDetailsComponent } from './components/action-details/action-details.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetectorDetailsComponent } from './components/detector-details/detector-details.component';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { LoginComponent } from './components/login/login.component';
import { LogsComponent } from './components/logs/logs.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'logs', component: LogsComponent },
  { path: 'detectors/:id', component: DetectorDetailsComponent /*, canActivate: [IsLoggedInGuard]*/ },
  { path: 'detectors', component: DetectorListComponent /*, canActivate: [IsLoggedInGuard]*/ },
  { path: 'actions/:id', component: ActionDetailsComponent /*, canActivate: [IsLoggedInGuard]*/ },
  { path: 'actions/new', component: ActionDetailsComponent /*, canActivate: [IsLoggedInGuard]*/ },
  { path: 'actions', component: ActionListComponent /*, canActivate: [IsLoggedInGuard]*/ },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
