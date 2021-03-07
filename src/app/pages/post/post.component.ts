import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  id: number
  post: Post
  loading_post: boolean = true
  last_date: string = '';
  
  constructor(
    public route: ActivatedRoute, public _PostsService: PostService
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'))
    this.obtenerInfoPost()
  }

  obtenerInfoPost() {
    this.loading_post = true
    this._PostsService.obtenerDetallePost(this.id).subscribe((response: Post) => {
      this.post = response
      this.loading_post = false
      console.log(response)
    })
  }
  getDate(date: string) {
    this.last_date = date
  }

}
