import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';





const routes:Routes = [
  
  {path:"",component:AppComponent},
  {path:"todo",component:TodoComponent},


  { path: "login", component: LoginComponent, children: [{ path: "todo", component: TodoComponent }] },
  { path: "signup", component: SignupComponent, children: [{ path: "login", component: LoginComponent }] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
 

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TodoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
   
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
