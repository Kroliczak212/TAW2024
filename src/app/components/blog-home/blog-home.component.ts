import { Component } from '@angular/core';
import { SearchBarComponent } from '../../shared/search-bar/search-bar.component';
import { BlogComponent } from '../blog/blog.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-blog-home',
  standalone: true,
  imports: [SearchBarComponent, BlogComponent],
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent {
  public filterText: string = '';

  constructor(private dataService: DataService) {}

  getName($event: string): void {
    this.filterText = $event; // Odbierz wartość filtra
  }

  refreshPosts(): void {
    this.dataService.refreshPosts(); // Wywołanie odświeżania danych w serwisie
  }
}
