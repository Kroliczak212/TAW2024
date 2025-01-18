import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent {
  public title: string = '';
  public text: string = '';
  public imageUrl: string = ''; // URL do obrazu
  public imagePreview: string | null = null; // Podgląd obrazka

  constructor(private dataService: DataService) {}

  // Podgląd obrazka na podstawie URL
  updatePreview(): void {
    if (this.imageUrl) {
      this.imagePreview = this.imageUrl; // Ustaw podgląd na podstawie wprowadzonego URL
    } else {
      this.imagePreview = null; // Brak obrazu, usuń podgląd
    }
  }

  // Dodawanie posta
  addPost(): void {
    if (!this.title || !this.text || !this.imageUrl) {
      alert('Tytuł, treść i URL obrazu są wymagane!');
      return;
    }
  
    const newPost = {
      title: this.title,
      text: this.text,
      image: this.imageUrl,
    };
  
    this.dataService.addPost(newPost).subscribe(
      () => {
        this.title = '';
        this.text = '';
        this.imageUrl = '';
        this.imagePreview = null;
        alert('Post został dodany!');
        this.dataService.refreshPosts(); // Powiadomienie o zmianie danych
      },
      (error) => {
        console.error('Wystąpił błąd podczas dodawania posta:', error);
        alert('Nie udało się dodać posta. Spróbuj ponownie później.');
      }
    );
  }
}  
