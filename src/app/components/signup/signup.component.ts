import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public credentials = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  create() {
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      console.error('Wszystkie pola są wymagane!');
      return;
    }
  
    this.authService.createOrUpdate(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Błąd podczas rejestracji:', err);
      },
    });
  }
  
}
