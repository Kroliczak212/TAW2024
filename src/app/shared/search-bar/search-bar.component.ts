import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TextFormatDirective } from '../../directives/text-format.directive';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, TextFormatDirective], // Dodaj dyrektywę do imports
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  public filterText: string = '';

  @Output() name = new EventEmitter<string>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filterText = params['name'] || '';
      this.sendFilter();
    });
  }

  sendFilter(): void {
    this.router.navigate(['/'], {
      queryParams: { name: this.filterText?.toLowerCase() }
    });
    this.name.emit(this.filterText);
  }
}
