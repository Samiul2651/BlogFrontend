import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {BlogPostDTO} from "../types";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-my-blogs',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.css'
})
export class MyBlogsComponent implements OnInit{
  data : BlogPostDTO[] = [];
  httpClient = inject(HttpClient);
  url = "http://localhost:8080/api/blogPost/getAllUser/";

  content = false;
  selected = false;
  selectedPost : BlogPostDTO = {
    title : "",
    content : "",
    author : ""
  };
  showFull(post : BlogPostDTO){
    this.selected = true;
    this.selectedPost = post;
  }
  ngOnInit() {
    let item = localStorage.getItem("username");
    let username = item ? JSON.parse(item) : null;
    this.httpClient
      .get<BlogPostDTO[]>(this.url+username)
      .subscribe((data: BlogPostDTO[]) => {
        this.data = data;
        this.content = true;
      });
  }
  closePopup() {
    this.selected = false;
  }
}
