import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectorListComponent } from './components/detector-list/detector-list.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: 'detectors', component: DetectorListComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
