import {Component, inject, OnInit} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeComponent} from "../home/home.component";
import { Output, EventEmitter } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {data} from "autoprefixer";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  profileForm = new FormGroup({
    userInput: new FormControl('', Validators.required),
    userPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  httpClient = inject(HttpClient);
  private url = "http://localhost:8080/api/user/login";
  private data: string = '';
  @Output() newItemEvent = new EventEmitter<boolean>();
  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }
  private user = {
    email : "",
    username : "",
    password : ""
  };
  handleSubmit(){
    //alert(this.profileForm.value["userInput"] + " " + this.profileForm.value["userPassword"]);
    this.user["username"] = <string>this.profileForm.value["userInput"];
    this.user["password"] = <string>this.profileForm.value["userPassword"];
    localStorage.setItem("username", JSON.stringify(this.profileForm.value["userInput"]));
    this.httpClient
      .post(this.url, this.user, { responseType: 'text' })
      .subscribe((data: string) => {
        // console.log(this.user.username);
        // console.log(this.user.password);
        // console.log(data);
        // this.data = data;
        if(data == "Login Successfull"){
          alert("Login Successfull");
          this.addNewItem(true);
        }
        else{
          alert("Login Failed");
        }
      });

  }



}
