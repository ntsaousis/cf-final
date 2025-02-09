import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/register.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized.component';


export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'WARDEN' } },
  { path: 'unauthorized', component: UnauthorizedComponent },

];
