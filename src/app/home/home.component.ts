import {Component, Input, ViewChild} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {NgIf} from "@angular/common";
import {MyBlogsComponent} from "../my-blogs/my-blogs.component";
import {CreateBlogComponent} from "../create-blog/create-blog.component";
import {AllBlogsComponent} from "../all-blogs/all-blogs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    NgIf,
    MyBlogsComponent,
    AllBlogsComponent,
    CreateBlogComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLogin = true;
  isLoginMode = true;
  isContentMode = false;
  isMine = false;
  isCreateMode = false;
  constructor() {}
  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }
  public showAll(){
    this.isMine = false;
    this.isCreateMode = false;
  }

  showMine(){
    this.isMine = true;
  }

  addItem(login: boolean) {
    if(login){
      this.isLoginMode = false;
      this.isContentMode = true;
      let item = localStorage.getItem("username");
      let username = item ? JSON.parse(item) : null;
      console.log(username);
    }
  }


  createBlog() {
    this.isCreateMode = true;
  }


}
