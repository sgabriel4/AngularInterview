import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comments } from 'src/app/models/comments.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() idPost: number;
  @Output() send_date: EventEmitter<string> = new EventEmitter<string>();
  comments: Array<Comments> = []
  loading_comments: boolean = true
  
  constructor(
    public postService: PostService
  ) { }

  ngOnInit() {
    this.obtenerComentarios()
  }

  obtenerComentarios() {
    console.log(this.idPost)
    this.loading_comments = true
    this.postService.obtenerComentarios(this.idPost).subscribe((response: Array<Comments>) => {
      console.log(response)
      this.comments = response
      this.loading_comments = false
    })
  }

  emitir() {
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var fecha = new Date();
    let last_date = fecha.getDate() + ", " + meses[fecha.getMonth()] + ", " + fecha.getFullYear()
    this.send_date.emit(last_date)
  }

}
