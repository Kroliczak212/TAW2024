import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Dodaj CommonModule i RouterModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  signOut() {
    const logoutObservable = this.authService.logout();
  
    if (logoutObservable) {
      logoutObservable.subscribe({
        next: () => {
          console.log('Wylogowanie zakończone sukcesem');
          this.router.navigate(['/login']); // Przekierowanie na stronę logowania
        },
        error: (err) => {
          console.error('Błąd podczas wylogowywania:', err);
        },
      });
    } else {
      console.error('Nie można wylogować użytkownika.');
    }
  }
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  
}
