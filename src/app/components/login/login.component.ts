import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common'; // Dodano CommonModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Dodano CommonModule
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials = { login: '', password: '' };
  public logged?: boolean;
  public errorMessage: string = ''; // Zmienna na komunikat błędu

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signIn() {
    this.authService.authenticate(this.credentials).subscribe({
      next: (result) => {
        if (!result) {
          this.logged = false;
          this.errorMessage = 'Niepoprawny login lub hasło. Spróbuj ponownie.';
        } else {
          this.credentials = { login: '', password: '' };
          this.errorMessage = ''; // Usuń komunikat błędu po poprawnym logowaniu
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Błąd podczas logowania:', err);
        this.errorMessage = 'Wystąpił błąd podczas logowania. Spróbuj ponownie później.';
      }
    });
  }
}
