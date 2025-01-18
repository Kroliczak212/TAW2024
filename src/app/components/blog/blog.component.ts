import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { AddPostComponent } from '../add-post/add-post.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { FilterTextPipe } from '../../pipes/filter-text.pipe';


@Component({
  selector: 'blog',
  standalone: true,
  imports: [ CommonModule, BlogItemComponent, AddPostComponent, GalleryComponent,FilterTextPipe],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  public items$: any[] = [];
  @Input() filterText: string = '';

  constructor(private service: DataService) {}

  ngOnInit() {
    
    this.service.posts$.subscribe((posts) => {
      this.items$ = posts; 
    });

    
    this.service.refreshPosts();
  }
}
