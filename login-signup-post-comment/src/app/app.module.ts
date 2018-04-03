import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {AsyncLocalStorageModule} from 'angular-async-local-storage';
import { UsersPostComponent } from './users-post/users-post.component';
import { CommentsComponentComponent } from './comments-component/comments-component.component';
// import {ToastrModule} from 'ngx-toastr';
const appRoutes: Routes = [  
  
  { path: '', component: LoginComponentComponent },
  { path: 'signup',      component: SignUpComponent },
  { path: 'profile',      component: UsersPostComponent },
  { path: 'comments',      component: CommentsComponentComponent }
  
];

// {
//   path: 'heroes',
//   component: HeroListComponent,
//   data: { title: 'Heroes List' }
// },
// { path: '',
//   redirectTo: '/heroes',
//   pathMatch: 'full'
// },
// { path: '**', component: PageNotFoundComponent }

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    SignUpComponent,
    UsersPostComponent,
    CommentsComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AsyncLocalStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
