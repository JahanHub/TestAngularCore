import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appChangeText]'
})
export class ChangeTextDirective {

  @Input() set appChangeText(value: string){
    this.element.nativeElement.innerText= value;
  }

  constructor(private element: ElementRef) {}


}
