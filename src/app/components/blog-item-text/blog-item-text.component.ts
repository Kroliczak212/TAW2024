import { Component, Input } from '@angular/core';
import { SummaryPipe } from "../../pipes/summary.pipe";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'blog-item-text',
  standalone: true,
  imports: [SummaryPipe, RouterModule],
  templateUrl: './blog-item-text.component.html',
  styleUrls: ['./blog-item-text.component.css'],
})
export class BlogItemTextComponent {
  @Input() text?: string; // Skrócony tekst posta
  @Input() id?: string;   // Identyfikator posta

  constructor(private router: Router) {}

  
}