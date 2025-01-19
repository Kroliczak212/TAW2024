import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'blog-item-details',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './blog-item-details.component.html',
  styleUrls: ['./blog-item-details.component.css'],
})
export class BlogItemDetailsComponent implements OnInit {
  public id!: string;
  public title!: string;
  public text!: string;
  public image!: string;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.dataService.getById(this.id).subscribe(
      (post) => {
        this.title = post.title;
        this.text = post.text;
        this.image = post.image;
      },
      (error) => {
        console.error('Błąd podczas pobierania szczegółów postu:', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['blog']);
  }

  deletePost(): void {
    if (confirm('Czy na pewno chcesz usunąć ten post?')) {
      this.dataService.deletePostById(this.id).subscribe(
        () => {
          alert('Post został usunięty.');
          this.router.navigate(['/blog']); // Przekierowanie po usunięciu
        },
        (error) => {
          console.error('Błąd podczas usuwania posta:', error);
          alert('Wystąpił błąd podczas usuwania posta.');
        }
      );
    }
  }
  
}
