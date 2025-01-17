import { Component } from '@angular/core';
import { BlogComponent } from './components/blog/blog.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CommentsSectionComponent } from './components/comments-section/comments-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BlogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
