import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentsService, Comment } from '../../services/comments.service';

@Component({
  selector: 'comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.css']
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId?: string;

  public comments: Comment[] = [];
  public newCommentText: string = '';

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    if (this.postId) {
      this.comments = this.commentsService.getCommentsByPostId(this.postId);
    }
  }

  addComment() {
    if (!this.postId || !this.newCommentText) return;

    this.commentsService.addComment(this.postId, this.newCommentText);
    // aktualizujemy widok
    this.comments = this.commentsService.getCommentsByPostId(this.postId);
    this.newCommentText = '';
  }
}
