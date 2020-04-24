import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showBackCard]'
})
export class ShowBackCardDirective {

  constructor( private renderer: Renderer2) { }

  @HostListener('click', ['$event']) onClick(e) {
    const card = this.renderer.selectRootElement('.card', true)
    this.renderer.addClass(card, 'rotate-card')
  }

}
