import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { RegisterComponent } from './home/register/register.component';

const routes: Routes = [
  {
    path: 'signUp',
    component: RegisterComponent
  },
  {
    path: 'registerUser',
    component: RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
