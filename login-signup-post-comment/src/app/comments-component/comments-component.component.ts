import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ModelService} from '../modalsAsService/model.service';


@Component({
  selector: 'app-comments-component',
  templateUrl: './comments-component.component.html',
  styleUrls: ['./comments-component.component.css'],
  providers:[ModelService]
})
export class CommentsComponentComponent implements OnInit {

  private localStorage = window.localStorage;
  private post;
  private comments_list = [];

  constructor(private modalAsService : ModelService) { 
      this.post = this.localStorage.getItem("post");     
      this.getComments();
  }

  ngOnInit() {
  }

  createComments(commentsForm: NgForm){
    console.log(this.localStorage.getItem("post_id"),commentsForm.value.comments);
    this.modalAsService.createComment(this.localStorage.getItem("post_id"),commentsForm.value.comments)
    .subscribe((response)=>{
      console.log(response);
      this.getComments();
    });
  }

  getComments(){
    this.modalAsService.getComments(this.localStorage.getItem("post_id"))
      .subscribe(data=> {
          console.log(data);
          this.comments_list = data['data'].slice(0,data.length);
          console.log(this.comments_list);
      });
  }
}
