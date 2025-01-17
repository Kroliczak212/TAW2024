import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'add-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  public title: string = '';
  public text: string = '';
  public image?: File; // Przechowuje wybrany plik
  public imagePreview: string | null = null; // Przechowuje podgląd obrazka

  constructor(private dataService: DataService) {}

  // Obsługa wybrania pliku
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.image = file;

      // Tworzenie podglądu obrazka
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Dodawanie posta
  addPost(): void {
    if (!this.title || !this.text) {
      alert('Tytuł i treść są wymagane!');
      return;
    }

    const newPost = {
      title: this.title,
      text: this.text,
      image: this.imagePreview || '', // Wstawiamy podgląd obrazka jako Base64
      id: new Date().getTime().toString()
    };

    this.dataService.addPost(newPost);

    // Czyszczenie formularza
    this.title = '';
    this.text = '';
    this.image = undefined;
    this.imagePreview = null;
    alert('Dodano nowy post!');
  }
}
