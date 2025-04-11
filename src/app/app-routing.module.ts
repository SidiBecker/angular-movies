import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListComponent } from './pages/list/list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //TODO: 404
];


@NgModule({ exports: [RouterModule], imports: [RouterModule.forRoot(routes)], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppRoutingModule { }
