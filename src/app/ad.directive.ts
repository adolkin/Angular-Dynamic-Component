import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})

export class AdDirective {
  // AdDirective injects ViewContainerRef into its constructor. 
  // This is how the directive accesses the element that you want to use to host the dynamic component.
  constructor(public viewContainerRef: ViewContainerRef) { }
}