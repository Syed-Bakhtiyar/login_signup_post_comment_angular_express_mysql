import { Component, OnInit } from '@angular/core';
import {ModelService} from '../modalsAsService/model.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-post',
  templateUrl: './users-post.component.html',
  styleUrls: ['./users-post.component.css'],
  providers:[ModelService]
})
export class UsersPostComponent implements OnInit {

  private userPost:string;
  private id:number;
  private postList = [];
  private localStorage = window.localStorage;

  constructor(private modalAsService : ModelService, private router: Router) {
    this.id = parseInt(window.localStorage.getItem('id'));
    console.log('myId',window.localStorage.getItem('id')); 
  }

  ngOnInit() {
    this.getUsersPost();
  }

  createPost(form:NgForm){
    console.log(this.id);
    this.modalAsService.createPost(this.id,form.value.post).subscribe((data)=>{
      console.log(data);
      this.getUsersPost();
    });
  }

  getUsersPost(){
    this.modalAsService.getUserPost(this.id).subscribe(data => {
      console.log('post_data',data);
      this.postList = data['data'].slice(0,data['data'].length);
    });
  }

  removePost(post){
    console.log('id',post.id);
    this.modalAsService.deleteUserPost(post.id).subscribe(response=>{
      console.log(response);
      this.getUsersPost();
    });
  }

  openComments(post){
    console.log('post',post.post);
    localStorage.setItem("post_id",post.id);
    localStorage.setItem("post",post.post);
    this.router.navigate(["/comments"]);
  }
}
