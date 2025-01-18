import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private url = 'http://localhost:3000';

  private postsSubject = new BehaviorSubject<any[]>([]);
  public posts$ = this.postsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/api/posts');
  }

  addPost(post: any): Observable<any> {
    return this.http.post<any>(this.url + '/api/post', post);
  }

  refreshPosts(): void {
    this.getAll().subscribe((posts) => {
      this.postsSubject.next(posts); // Emituj nową listę postów
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/api/post/${id}`); // Backend musi obsłużyć trasę /api/posts/:id
  }
  
  
}