import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModelService} from '../modalsAsService/model.service';
import {Router} from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[ModelService]
})
export class SignUpComponent implements OnInit {

  
  constructor(private modalAsService : ModelService, private router:Router) { 
  }

  ngOnInit() {
  }

  createUser(form:NgForm){
      // console.log(form.value.fname, form.value.lname, form.value.email, form.value.password);
      this.modalAsService.createUserAccount(form.value.fname, form.value.lname, form.value.email, form.value.password).subscribe((response)=>{
        console.log(response);
        if(response.error == -1)
          swal('Congratulations','Your Account Is Created Successfully','success');
        else
          alert('user is already exists');
      });
  }

}
