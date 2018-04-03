import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {AsyncLocalStorage} from 'angular-async-local-storage'
import {UserModel} from './user-model'

@Injectable()
export class ModelService {

  private URL_LOCAL:string = 'http://localhost:3000/';
  user:UserModel;
  userItem:UserModel;
  user_data;

  constructor(private http:Http, private asyncLocalStorageModel : AsyncLocalStorage) { }

  createUserAccount(first_name, last_name, email, password){
      let body = `first_name=${first_name}&last_name=${last_name}&email=${email}&password=${password}`;
      let header_options = new Headers({'Content-Type':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
      let request_option = new RequestOptions({method : RequestMethod.Post, headers : header_options});
      return this.http.post(this.URL_LOCAL+'createUser',body,request_option).map(x => x.json());
      
  }

  getUserAccount(email, password){
      let body = `email=${email}&password=${password}`;
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
      let request_option = new RequestOptions({method : RequestMethod.Post, headers: headers});
      return this.http.post(this.URL_LOCAL+'userlogin',body,request_option).map(x => x.json());
  }

  createPost(user_id, post){
      let body = `user_id=${user_id}&post=${post}`;
      let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
      let request_option = new RequestOptions({method : RequestMethod.Post, headers: headers});
      return this.http.post(this.URL_LOCAL+'createPost',body,request_option).map(x => x.json());
  }

  getUserPost(user_id){
      return this.http.get(this.URL_LOCAL+"getPost?user_id="+user_id).map(x=> x.json());
  }

  deleteUserPost(post_id){
    let body = `post_id=${post_id}`;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
    let request_option = new RequestOptions({method : RequestMethod.Post, headers: headers});
    return this.http.delete(this.URL_LOCAL+"deletePost?post_id="+post_id).map(x=> x.json());
  }

  createComment(post_id, comments){
        console.log(post_id, comments);
        let body = `post_id=${post_id}&comments=${comments}`;
        console.log(`post_id=${post_id}&comments=${comments}`,body);
        let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded',"cache-control": "no-cache"});
        let request_option = new RequestOptions({method : RequestMethod.Post, headers: headers});
        return this.http.post(this.URL_LOCAL+"createComments",body,request_option).map(x => x.json());
  }
  
  getComments(post_id){
    return this.http.get(this.URL_LOCAL+"getComment?post_id="+post_id).map(x=> x.json());
  }

  deleteComments(comments_id){
    return this.http.delete(this.URL_LOCAL+"deleteComment?comment_id="+comments_id).map(x=> x.json());
  }
}