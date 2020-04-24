import { Directive, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showFronCard]'
})
export class ShowFrontCardDirective {

  constructor(private renderer: Renderer2) { }

  @HostListener('click', ['$event']) onClick(e) {
    const card = this.renderer.selectRootElement('.card', true)
    this.renderer.removeClass(card, 'rotate-card')
  }

}
