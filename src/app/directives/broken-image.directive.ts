import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appBrokenImage]',
})
export class BrokenImageDirective {
  @Input() appBrokenImage: string;

  constructor(private elRef: ElementRef) {}

  @HostListener('error')
  handleBrokenImage() {
    const element: HTMLImageElement = <HTMLImageElement>(
      this.elRef.nativeElement
    );
    element.src =
      this.appBrokenImage ||
      'https://placehold.co/600x400?text=Image+Not+Found';
  }
}
