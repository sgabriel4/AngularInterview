import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  loading_posts: boolean = true
  posts: Array<Post> = []
  showPosts: Array<Post> = []
  show_index: number = 0
  
  constructor(
    public postService: PostService
  ) { }

  ngOnInit() {
    this.obtenerPost()
  }

  obtenerPost() {
    this.loading_posts = true
    this.postService.obtenerPosts().subscribe((response: Array<Post>) => {
      this.loading_posts = false
      this.posts = response
      this.show(10)
    })
  }

  back(number: number) {
    if (this.show_index != number) {
      this.show_index = this.show_index - number
      this.showPosts = []
      for (let index = (this.show_index - number); index < (this.show_index); index++) {
        this.showPosts.push(this.posts[index])
      }
    }
  }
  
  show(number: number) {
    if (this.show_index < this.posts.length) {
      this.showPosts = []
      for (let index = this.show_index; index < (this.show_index + number); index++) {
        this.showPosts.push(this.posts[index])
      }
      this.show_index = this.show_index + number
    }
  }

}
