import {Component, inject, OnInit} from '@angular/core';
import {BlogPostDTO} from "../types";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-all-blogs',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './all-blogs.component.html',
  styleUrl: './all-blogs.component.css'
})
export class AllBlogsComponent implements OnInit{
  data : BlogPostDTO[] = [];
  httpClient = inject(HttpClient);
  url = "http://localhost:8080/api/blogPost/getAll";
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
    this.httpClient
      .get<BlogPostDTO[]>(this.url)
      .subscribe((data: BlogPostDTO[]) => {
        this.data = data;
        this.content = true;
      });
  }


  closePopup() {
    this.selected = false;
  }
}
