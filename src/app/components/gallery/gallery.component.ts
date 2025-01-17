import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public images: string[] = [];
  public enlargedImage?: string; // do powiększania

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    const posts = this.dataService.getAll();
    this.images = posts.map(p => p.image);
  }

  enlarge(image: string) {
    this.enlargedImage = image;
  }

  closeEnlarge() {
    this.enlargedImage = undefined;
  }
}
