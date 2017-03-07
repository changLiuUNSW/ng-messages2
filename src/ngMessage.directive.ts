import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { ClTemplatePortalDirective } from './templatePortal.directive';

@Directive({
  selector: '[clNgMessage]'
})
export class ClNgMessageDirective extends ClTemplatePortalDirective {
  @Input('clNgMessage')
  type: string;

  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
    super(templateRef, viewContainerRef);
  }
}
