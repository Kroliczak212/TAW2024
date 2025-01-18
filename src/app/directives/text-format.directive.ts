import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[textFormat]',
  standalone: true
})
export class TextFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur() {
    // Pobierz wartość z pola input
    const value = this.el.nativeElement.value;
    // Zamień wartość na małe litery
    this.el.nativeElement.value = value.toLowerCase();
  }
}
