import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAlphabeticOnly]'
})
export class AlphabeticOnlyDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    input.value = value.replace(/[^a-zA-Z\s]/g, ''); 
    if (value !== input.value) { 
      event.preventDefault();
    }
  }                               
}