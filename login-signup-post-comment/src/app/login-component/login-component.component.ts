import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ModelService} from '../modalsAsService/model.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
  providers:[ModelService]
})
export class LoginComponentComponent implements OnInit {

  
  private email:string;
  private password:string;
  private localStorage = window.localStorage;

  constructor(private modalAsService : ModelService,private router: Router) { 
    // if(window.localStorage.getItem('id')){
    //   this.router.navigate(["/profile"]);
    // }
  }

  ngOnInit() {
    
  }

  onLogin(form : NgForm){
    console.log(form.value.email,form.value.password);
    this.modalAsService.getUserAccount(form.value.email,form.value.password)
    .subscribe(data => {
      console.log("response_data",data);
       if(data['data'].length > 0 ){
         localStorage.setItem('id',data['data'][0].id);
         this.router.navigate(["/profile"]);
       }
    });
  }

  openSignUpForm(){
    this.router.navigate(["/signup"]);
  }

}
