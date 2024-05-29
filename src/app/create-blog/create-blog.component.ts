import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.css'
})
export class CreateBlogComponent {
  blogForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', [Validators.required, Validators.minLength(50)]),
  })
  httpClient = inject(HttpClient);
  url = "http://localhost:8080/api/blogPost/save";
  BlogPost = {
    title: "",
    content: "",
    author: ""
  }
  check = false;
  handleSubmit(){
    this.check = !!this.titleAvailability();
    console.log(this.check);
    if(this.check){
      if(this.blogForm.value["title"] != null)this.BlogPost.title = this.blogForm.value["title"];
      if(this.blogForm.value["content"] != null)this.BlogPost.content = this.blogForm.value["content"];
      let item = localStorage.getItem("username");
      let username = item ? JSON.parse(item) : null;
      if(username != null)this.BlogPost.author = username;
      this.httpClient
        .put(this.url, this.BlogPost, {responseType : 'text'})
        .subscribe((data: string) => {
          console.log(data);
        });
    }
    else{
      return;
    }



  }
  titleAvailability(): Observable<boolean>{
    let title = this.blogForm.value["title"];
    let item = localStorage.getItem("username");
    let username = item ? JSON.parse(item) : null;
    let url = "http://localhost:8080/api/blogPost/check/"+username+"/"+title;
    return this.httpClient
      .get(url, { responseType: 'text' })
      .pipe(
        map((data: string) => data === "Title Available")
      );
  }

}

