import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit {
  public images: string[] = [];
  public enlargedImage?: string; // For enlarging images

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Subskrybuj zmiany w strumieniu `posts$`
    this.dataService.posts$.subscribe((posts) => {
      this.images = posts
        .map((p) => p.image) // Wybierz pole `image`
        .filter((url) => url.startsWith('http')); // Filtruj poprawne URL-e
    });

    // Załaduj początkowe dane
    this.dataService.refreshPosts();
  }

  enlarge(image: string) {
    this.enlargedImage = image;
  }

  closeEnlarge() {
    this.enlargedImage = undefined;
  }
}
