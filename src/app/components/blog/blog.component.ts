import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

// Importujemy wszystkie potrzebne komponenty
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { CommentsSectionComponent } from '../comments-section/comments-section.component';

@Component({
  selector: 'blog',
  standalone: true,
  imports: [
    CommonModule,
    BlogItemComponent,
    AddPostComponent,
    GalleryComponent
  ],
  providers: [DataService],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  public items: any[] = [];

  constructor(private service: DataService) { }

  ngOnInit(): void {
    // Pobieramy listę postów z serwisu
    this.items = this.service.getAll();
  }
}
