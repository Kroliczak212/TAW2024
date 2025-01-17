import { Injectable } from '@angular/core';

export interface Comment {
  postId: string;
  text: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private comments: Comment[] = [];

  constructor() { }

  // Zwraca komentarze tylko dla wybranego posta
  public getCommentsByPostId(postId: string): Comment[] {
    return this.comments.filter(c => c.postId === postId);
  }

  // Dodaje komentarz do posta
  public addComment(postId: string, text: string) {
    const newComment: Comment = {
      postId,
      text,
      date: new Date()
    };
    this.comments.push(newComment);
  }
}
